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
                <link rel="stylesheet" href="View/css/bootstrap.min.css" type="text/css">
                <link rel="stylesheet" href="View/css/bootstrap-multiselect.css" type="text/css">
                
                <link rel="stylesheet" href="View/css/style.min.css" type="text/css">

                <title>Kommuninfo</title>
            </head>
            <body>
                <div class="container" >
                    <div id="header">
                        <h1>Kommuninfo Stockholm</h1> 
                        <div  id="CrimeMessages">
                        </div>  
                        
                    </div>
                    <?php 
                      echo $regionView->createSelectionForm();
                      echo $mapView->createMap();
                    ?>
                    <div>
                        <em>This site uses cookies to improve user experience. By continuing to browse the site you are agreeing to our use of cookies.</em>
                    </div>
                </div>
                
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>            
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjvsiVcOe7SvxeLOYG0e_5bwO2V6Pvml4"></script>                
                
                <script src="View/js/bootstrap-multiselect.min.js" type="text/javascript" ></script>                
                <script src="View/js/Chart.min.js"  type="text/javascript"></script> 

                
                <script src="View/js/setupGoogleMap.js" type="text/javascript"></script> 
                <script src="View/js/requestSCB.js" type="text/javascript"></script> 
                <script src="View/js/crimeReport.js" type="text/javascript"></script> 
                <script src="View/js/regionInfo.js" type="text/javascript"></script> 
<!--                

                <script src="View/js/bulkScripts.min.js" type="text/javascript"></script> 
-->                
                
            </body>
        </html>
        <?php
    }    
}