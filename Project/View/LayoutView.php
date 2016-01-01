<?php

namespace view;

class LayoutView {
    
    public function renderLayout($regionView, $mapView) {
        ?>
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
                <link rel="stylesheet" href="View/css/bootstrap-multiselect.css" type="text/css">
                <link rel="stylesheet" type="text/css" href="View/css/style.css">

                <title>Kommun info</title>
            </head>
            <body>
                <div class="container" >
                    <div id="header">
                        <h1>Kommunjämförelsen</h1> 
                        
                    </div>
                    <?php 
                      echo $regionView->createSelectionForm();
                      echo $mapView->createMap();
                ?>
                </div>
                <div>
                    <em>This site uses cookies to improve user experience. By continuing to browse the site you are agreeing to our use of cookies.</em>
                </div>
                
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>            
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjvsiVcOe7SvxeLOYG0e_5bwO2V6Pvml4"></script>                
                
                <script src="View/js/bootstrap-multiselect.js" type="text/javascript" ></script>                
                <script src="View/js/Chart.js"  type="text/javascript"></script> 
                <script src="View/js/setupGoogleMap.js" type="text/javascript"></script> 
                <script src="View/js/requestSCB.js" type="text/javascript"></script> 
                <script src="View/js/regionInfo.js" type="text/javascript"></script> 
            </body>
        </html>
        <?php
    }    
}