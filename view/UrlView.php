<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UrlView
 *
 * @author User
 */
class UrlView {
    //put your code here
    
    private static $url = 'UrlView::Url';    
    private static $urlToScrap = 'UrlView::UrlToScrap';    
    
    public function response($url, $scrap) {

        $response = $this->generateUrlFormHTML($url);
        if ($scrap){
            $response .= $this->scrapUrlHTML($url);
        }
        return $response;
    }
        
    private function generateUrlFormHTML($url) {
        
            return '
                    <form method="post" > 
                            <fieldset>
                                    <legend>WebAgent - enter Url to scrap</legend>
                                    
                                    <label for="' . self::$url . '">Url :</label>
                                    <input type="text" id="' . self::$url . '" name="' . self::$url . '" value="' . $url . '" />

                                    <input type="submit" name="' . self::$urlToScrap . '" value="Start" />
                                    <input type="button" onclick="ajaxFunction()" value="Scrap"/>    
                            </fieldset>
                    </form>
            ';
    }    
    private function scrapUrlHTML($url) {
        echo $url;
        return 
        '
            <script language="javascript" type="text/javascript">
            function ajaxFunction($url){
                var ajaxRequest = new XMLHttpRequest();
                console.log("func");
                ajaxRequest.onreadystatechange = function() {
                    console.log( "svar" );
                    console.log(ajaxRequest.readyState);
                    console.log(ajaxRequest.status);
                    if (ajaxRequest.readyState == 4 ) {
                    alert(ajaxRequest.status);
                    console.log( "readyState test");
                    }
                }
                ajaxRequest.onload = function() {
                 var responseText = xhr.responseText;
                 console.log("onload" + responseText);
                 // process the response.
                };

                ajaxRequest.onerror = function() {
                  console.log("There was an error!");
                };                
                queryString =  "http://localhost:8080/" ;   
                console.log( queryString );
                ajaxRequest.open("GET", queryString, true);
                ajaxRequest.withCredentials = true;
                ajaxRequest.send();
            }
        </script>
        ';

    }    
    
    
    public function setUrl($url) {
        $_SESSION[self::$url] = $url;
        if ($_SERVER['REQUEST_METHOD'] === 'POST'){
            
        }
    }            
    public function getUrl() {
        if (isset($_SESSION[self::$url]))
            return $_SESSION[self::$url];
        else {
            return null;
        }
    }            
    public function isUserPost() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST'){
            if (isset($_POST[self::$url]))
                $this->setUrl($_POST[self::$url]);
            return true;
        }
        return false;
    }            
 
}
