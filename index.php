<?php
 /**
  * Solution for assignment 2
  * @author Daniel Toll
  */
/*
require_once("Settings.php");
require_once("controller/LoginController.php");
require_once("view/DateTimeView.php");
require_once("view/LayoutView.php");
require_once("view/RegisterView.php");
require_once("model/Password.php");
*/
        
//MAKE SURE ERRORS ARE SHOWN... MIGHT WANT TO TURN THIS OFF ON A PUBLIC SERVER
error_reporting(E_ALL);
ini_set('display_errors', 'On');
// enable use of $_SESSION variables
session_start();


    echo '<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Lab01</title>
        </head>
        <body>
          <h1>Lab 01</h1>
          
          
          <div class="container">
          <p>hej</p>
          </div>
         </body>
      </html>
    ';


//CREATE OBJECTS OF THE VIEWS
//$v      = new LoginView();       
//$dtv    = new DateTimeView();
//$lv     = new LayoutView();

//$uc = new UserController($lv,$v, $dtv);
//$uc->startLoginApplikation();



