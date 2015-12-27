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

    
    public function startApplikation($layoutView) {
            
//            $this->gameView->setSessionMessage("A game is started, good luck!");
            // $this->gameModel->renderGameSetup();
                 
        
//        if ($this->urlView->isUserPost()){
        if(isset($_POST['Region'])){     
            foreach ($_POST['Region'] as $selectedRegion){
                echo ("Kommun: " . $selectedRegion. "<br />\n");  
            }
        }
        if(isset($_POST['Criteria'])){     
            foreach ($_POST['Criteria'] as $selectedCriteri){
                echo ("Jämförelsekriteria: " . $selectedCriteri. "<br />\n");  
            }
        }
        else {
            echo("Ingen POST . ");
        }
        
        
        $layoutView->renderLayout($this->regionView, $this->mapView);
    }    
}    
