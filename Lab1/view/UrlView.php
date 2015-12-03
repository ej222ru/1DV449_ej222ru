<?php
/**
 *
 * @author Erland Jönsson
 */

class UrlView {
    //put your code here
    
    private static $url = 'UrlView::Url';    
    private static $urlToScrap = 'UrlView::UrlToScrap';    
    
    public function response($url) {

        $response = $this->generateUrlFormHTML($url);
        return $response;
    }
        
    private function generateUrlFormHTML($url) {
        
            return '
                    <form method="post" > 
                            <fieldset>
                                    <legend>WebAgent - enter Url to scrape</legend>
                                    
                                    <label for="' . self::$url . '">Url :</label>
                                    <input type="text" id="' . self::$url . '" name="' . self::$url . '" value="' . $url . '" />

                                    <input type="submit" name="' . self::$urlToScrap . '" value="Start" />
                            </fieldset>
                    </form>
            ';
    }    
    
    
    public function getPostedUrl(){      
        return $_POST[self::$url];
    }
        
    public function isUserPost() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST'){
            if (isset($_POST[self::$url])){
                return true;
            }
        }
        return false;
    }            
 
}
