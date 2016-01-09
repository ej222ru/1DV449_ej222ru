<?php

namespace model;

require_once("model/QueriesSCB.php");
require_once("model/QueriesBrottsplatsen.php");

class RegionModel {

    private $queriesSCB;
    private $queriesBrottsplatsen;
    
    public function __construct() {
        $this->queriesSCB = new \model\QueriesSCB();
        $this->queriesBrottsplatsen = new \model\QueriesBrottsplatsen();
    }   

    public function getRequestUrl1() {
        return $this->queriesBrottsplatsen->getUrl();
    }

    
    public function getRequestUrl($query) {
        return $this->queriesSCB->getUrl($query);
    }
    
    public function getRequestQuery($query, $region) {
        return $this->queriesSCB->getQuery($query ,$region);
    }
    
}
