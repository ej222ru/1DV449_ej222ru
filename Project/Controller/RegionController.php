<?php 

/**
 * @author Erland Jönsson
 */
namespace controller;

require_once("Model/RegionModel.php");
require_once("View/RegionView.php");


class RegionController {
    
    private $regionModel;
    private $regionView;
    private $mapView;
    private static $errMessage = "RegionController::errMessage";
            
    public function __construct(\model\RegionModel $regionModel, \view\RegionView $regionView, \view\MapView $mapView) {
            $this->regionModel = $regionModel;
            $this->regionView =  $regionView;
            $this->mapView =  $mapView;
    }    

    public function setErrorMessage($error) {
        $_SESSION[self::$errMessage] = $error;
    }   
    
    public function getErrorMessage() {
        if (isset($_SESSION[self::$errMessage])) {
            $message = $_SESSION[self::$errMessage];
            unset($_SESSION[self::$errMessage]);
            return $message;            
        }
        else {
            return null;
        }
    }   
    
    public function curl_get_request($url){
        $ch = curl_init( $url );
        # Return response instead of printing.
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        # Send request.
        $result = false;
        $result = curl_exec($ch);
        if(!$result){
            $message = curl_error($ch);
            $this->logDebug("curl_get_request result null, error message:" . $message ." url:" . $url);
            $this->setErrorMessage($message);
            return "";
        }
        else if ($result === false){
           $message = curl_error($ch);
           $this->logDebug("curl_get_request result false, error message: " . $message );
           $this->setErrorMessage($message);
           return "";
        }
        else if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200){
            $this->logDebug("curl_get_request http code: " . curl_getinfo($ch, CURLINFO_HTTP_CODE));
            $message = "Något gick fel i hämtning av data";
            $this->setErrorMessage($message);
            return "";
        }
        $this->logDebug("curl_get_request return successfully");
        curl_close($ch);
        return $result;
    }
    
    
    public function curl_post_request($url, $data){
        $ch = curl_init( $url );
        // test settings
        //  $ch = curl_init('http://404.php.net/');   // err=6  code = 0  result = false  text 
        //  url correct but server return something wrong       // err=0  code = 404 result = something
        //  all goes well                                       // err=0  code = 200 result something    
        # Setup request to send json via POST.
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json','charset=utf-8'));
        # Return response instead of printing.
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        # Send request.
        $result = curl_exec($ch);
        if(!$result){
            $message = curl_error($ch);
            $this->logDebug("curl_post_request result null, error message:" . $message ." url:" . $url);
            $this->setErrorMessage($message);
            return "";
        }
        else if ($result === false){
           $message = curl_error($ch);
           $this->logDebug("curl_post_request result false, errör message:" . $message);
           $this->setErrorMessage($message);
           return "";
        }
        else if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200){
            $this->logDebug("curl_post_request http code: " . curl_getinfo($ch, CURLINFO_HTTP_CODE));
            $message = "Något gick fel i hämtning av data";
            $this->setErrorMessage($message);
            return "";
        }
        else {
            $result = substr($result, 3); // Remove DOM mark, first three char
        }
        $this->logDebug("curl_post_request return successfully");
        curl_close($ch);
        return $result;
    }
    
    
    public function logDebug($text){
        $file;
        $filename = "Cache/log.txt";
        $today = date ( "ymd",time());
        $file = fopen($filename, "a");
        $ch = fwrite($file, $today . "--" . $text . PHP_EOL);
        fclose($file);        
    }
    
    public function saveToCache($region, $criteria, $value) {
        $filename = "Cache/" . $region . $criteria . ".txt";
        $file;
        $exist = file_exists($filename);
        if (!$exist){
            $file = fopen($filename, "x+");
            $ch = fwrite($file, $value);
        }
        else{
            $file = fopen($filename, "w");
            $ch = fwrite($file, $value);
        }
        fclose($file);        
    }

    public function getFromCache($region, $criteria) {
        $value = "";
        $filename = "Cache/" . $region . $criteria . ".txt";
        $file;
        $exist = file_exists($filename);
        if ($exist){
            
            $dateChanged = date("ymd",filemtime($filename));
            $today = date ( "ymd",time());
            if ($today > $dateChanged){
                $this->logDebug("File exist but content old " . $filename);
               // return $value = ""  to signal a new get from source    
            }
            else{
                $this->logDebug("File exist content fresh " . $filename);
                $file = fopen($filename, "r");
                $value = fread($file, filesize($filename));
            }
            fclose($file);        
        }
        else{
            $this->logDebug("File does not exist " . $filename);
        }
        return $value;
    }
    
    
    public function startApplikation($layoutView) {
            
        $arrRegion;
        $arrCriteria;
        $arrValue;
        $json;
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            if(isset($_POST['Crime'])){   
                $response = $this->curl_get_request($this->regionModel->getRequestUrlCrime());
                header('Content-type: application/text');
                echo $response;
                return;
            }
            
            if((isset($_POST['Region'])) && (isset($_POST['Criteria']))){   
                $return = "";
                // At most three regions for two criteria each hence the condition < 6
                foreach ($_POST['Region'] as $selectedRegion){
                    if(isset($_POST['Criteria'])){     
                        foreach ($_POST['Criteria'] as $selectedCriteria){
                            $valueFromCache = $this->getFromCache($selectedRegion, $selectedCriteria);
                            if ($valueFromCache === ""){
                                //     
                                $response = $this->curl_post_request($this->regionModel->getRequestUrl($selectedCriteria), $this->regionModel->getRequestQuery($selectedCriteria, $selectedRegion));
                                if ($response !== ""){
                                    $responseObject = json_decode($response );

                                    foreach($responseObject->data as $data) {
                                        $value = $data->values[0];

                                        $arrValue = array("type" => $selectedCriteria);
                                        $arrValue["value"] = $value;
                                        $arrCriteria = array("Criteria" => $arrValue);

                                        $arrRegion = array("Region" => $selectedRegion);
                                        $arrRegion["Criteria"] = $selectedCriteria;
                                        $arrRegion["Value"] = $value;
                                        $this->saveToCache($selectedRegion, $selectedCriteria, $data->values[0]);    
                                    }
                                }
                                else {
                                    $err = $this->getErrorMessage();
                                    $arr["error"] = "true";
                                    $arr["errorText"] = $err;
                                    $arr = json_encode($arr);
                                    echo $arr;
                                    return;
                                }                                   
                            }
                            else{
                                $value = $valueFromCache;                                    
                                $arrRegion["Region"] = $selectedRegion;
                                $arrRegion["Criteria"] = $selectedCriteria;
                                $arrRegion["Value"] = $value;
                            }
                        }
                    }
                }
                $jsonData = json_encode($arrRegion);
                echo $jsonData;                
            }
            else {
                $arr["error"] = "true";
                $arr["errorText"] = "Kommun eller egenskap att jämföra inte vald";
                $arr = json_encode($arr);
                echo $arr;                
            }
        }
        else {
            $layoutView->renderLayout($this->regionView, $this->mapView);
        }
    }
}    
