<?php

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

        
        return 
        '

        ';

    }    
    
    
    public function getPostedUrl(){      
        return $_POST[self::$url];
    }
        
    public function isUserPost() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST'){
            if (isset($_POST[self::$url])){
                echo("is POST");                
                return true;
            }
        }
            echo("is NOT POST");
        return false;
    }            
 
}
