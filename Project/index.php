<?php

//set_include_path ('/home/www/ej222ru.co.nf');
//define('__ROOT__', dirname(dirname(__FILE__)));
//require_once(__ROOT__.'/ej222ru.co.nf/Settings.php'); 

//
require_once("Settings.php");

        
require_once("Controller/RegionController.php");
require_once("View/LayoutView.php");
require_once("View/RegionView.php");
require_once("View/MapView.php");
require_once("Model/RegionModel.php");

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

//Generate output
$layoutView = new \view\LayoutView();

$regionController->startApplikation($layoutView);



