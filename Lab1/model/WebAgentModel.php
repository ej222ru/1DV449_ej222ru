<?php

/**
 *
 * @author Erland Jönsson
 */

class WebAgentModel {
    private static $url = 'UrlView::Url';    
    
    public function setUrl($url) {
        $_SESSION[self::$url] = $url;
    }    
    public function getUrl() {
        if (isset($_SESSION[self::$url]))
            return $_SESSION[self::$url];
        else {
            return null;
        }
    }       
}
