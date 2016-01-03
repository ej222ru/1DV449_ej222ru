<?php 

/**
 * @author Erland Jönsson
 */
namespace controller;


require_once("model/RegionModel.php");
require_once("view/RegionView.php");


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
    
    
    public function curl_post_request($url, $data){
        $ch = curl_init( $url );
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
        if ($result === false){
           $message = curl_error($ch);
           $this->setErrorMessage($message);
           return "";
        }
        else if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200){
            $message = "Något gick fel i hämtning av data";
            $this->setErrorMessage($message);
            return "";
        }
        else {
            $result = substr($result, 3);
        }
        curl_close($ch);
        return $result;
    }
    
    
    public function logDebug($text){
        $file;
        $filename = "cache/log.txt";
        $today = date ( "ymd",time());
        $file = fopen($filename, "a");
        $ch = fwrite($file, $today . "--" . $text);
        fclose($file);        
    }
    
    public function saveToCache($region, $criteria, $value) {
        $filename = "cache/" . $region . $criteria . ".txt";
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
        $filename = "cache/" . $region . $criteria . ".txt";
        $file;
        $exist = file_exists($filename);
        if ($exist){
            
            $dateChanged = date("ymd",filemtime($filename));
            $today = date ( "ymd",time());
            if ($today > $dateChanged){
                $this->logDebug("File exist but content old " . $filename . PHP_EOL);
               // return $value = ""  to signal a new get from source    
            }
            else{
                $this->logDebug("File exist content fresh " . $filename . PHP_EOL);
                $file = fopen($filename, "r");
                $value = fread($file, filesize($filename));
            }
            fclose($file);        
        }
        else{
            $this->logDebug("File does not exist " . $filename . PHP_EOL);
        }
        return $value;
    }
    
    
    public function startApplikation($layoutView) {
            
        $arrTotal;
        $arrRegion;
        $arrCriteria;
        $arrValue;
        $json;
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            if((isset($_POST['Region'])) && (isset($_POST['Criteria']))){   
                $return = "";
                $indexR = 0;
                $indexC = 0;
                // At most three regions for two criteria each hence the condition < 6
                foreach ($_POST['Region'] as $selectedRegion){
                    if ($indexR < 6){
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
                                            
                                            if ($indexC == 0){
                                                $arrValue = array("type" => $selectedCriteria);
                                                $arrValue["value"] = $value;
                                                $arrCriteria = array("Criteria" => $arrValue);
                                            }
                                            else{
                                                $arrValue["type"] = $selectedCriteria;
                                                $arrValue["value"] = $value;
                                                $arrCriteria["Criteria"] = $arrValue;
                                            }

                                            if ($indexR == 0){
                                                $arrRegion = array("Region" => $selectedRegion);
                                                $arrRegion["Criteria"] = $selectedCriteria;
                                                $arrRegion["Value"] = $value;
                                            }
                                            else{
                                                $arrRegion["Region"] = $selectedRegion;
                                                $arrRegion["Criteria"] = $selectedCriteria;
                                                $arrRegion["Value"] = $value;
                                            }
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
                                $arrTotal[$indexR++] = $arrRegion;
                            }
                        }
                    }
                }
                $jsonData = json_encode($arrTotal);
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
