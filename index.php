<?php

require_once("controller/WebAgentController.php");
require_once("model/WebAgentModel.php");
require_once("view/LayoutView.php");
require_once("view/UrlView.php");

        
error_reporting(E_ALL);
ini_set('display_errors', 'On');
// enable use of $_SESSION variables
session_start();


$layoutView = new LayoutView();
$urlView = new UrlView();
$webAgentController= new WebAgentController("localhost:8080", $layoutView, $urlView);
$webAgentController->startWebAgentApplikation();



