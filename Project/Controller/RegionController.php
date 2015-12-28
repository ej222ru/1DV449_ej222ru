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

    public function __construct(\model\RegionModel $regionModel, \view\RegionView $regionView, \view\MapView $mapView) {
            $this->regionModel = $regionModel;
            $this->regionView =  $regionView;
            $this->mapView =  $mapView;
    }    

    
    public function curl_post_request($url, $data){
        $ch = curl_init( $url );
        # Setup request to send json via POST.
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json','charset=utf-8'));
        # Return response instead of printing.
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        # Send request.
        $result = curl_exec($ch);
        $result = substr($result, 3);
        curl_close($ch);
        # Print response.
//        echo "$result";
        return $result;
    }
    
    
    public function startApplikation($layoutView) {
            
//            $this->gameView->setSessionMessage("A game is started, good luck!");
            // $this->gameModel->renderGameSetup();
                 
        if(isset($_POST['Region'])){   
            $return = "";
            $index = 0;
            foreach ($_POST['Region'] as $selectedRegion){
                if ($index++ < 2){
//                    echo ("Kommun: " . $selectedRegion. "<br />\n");  
                    
                    
                    if(isset($_POST['Criteria'])){     
                        foreach ($_POST['Criteria'] as $selectedCriteria){
  //                          echo ("Jämförelsekriteria: " . $selectedCriteria. "<br />\n");  
                            
                            $response = $this->curl_post_request($this->regionModel->getRequestUrl($selectedCriteria), $this->regionModel->getRequestQuery($selectedCriteria, $selectedRegion));
                            $responseObject = json_decode($response );

                            foreach($responseObject->data as $data) {
                                $value = floatval($data->values[0]);
                                $return =  "{$selectedRegion}:{$selectedCriteria}:{$value}:";
                            }
                        }

                    }
            
                }
            }
                                
            echo $return;
            
            
        }
        else {
            echo("Ingen POST . ");
        
            $layoutView->renderLayout($this->regionView, $this->mapView);
        }
    }    
}    
