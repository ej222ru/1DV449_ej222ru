<?php

require_once("Settings.php");
require_once("controller/RegionController.php");
require_once("view/LayoutView.php");
require_once("view/RegionView.php");
require_once("view/MapView.php");
require_once("MODEL/RegionModel.php");

if (Settings::DISPLAY_ERRORS) {
    error_reporting(-1);
    ini_set('display_errors', 'ON');
}

//session must be started before LoginModel is created
session_start(); 

//Dependency injection
$regionModel = new \model\RegionModel();
$regionView = new \view\RegionView();

$mapView = new \view\MapView();
$regionController = new \controller\RegionController($regionModel, $regionView, $mapView);



//Controller must be run first since state is changed
// $regionController->doControl();


//Generate output
$layoutView = new \view\LayoutView();

$regionController->startApplikation($layoutView);



