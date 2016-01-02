<?php

namespace model;

require_once("model/QueriesSCB.php");

class RegionModel {

    private $queriesSCB;
    
    public function __construct() {
        $this->queriesSCB = new \model\QueriesSCB();
    }   
    
    public function getRequestUrl($query) {
        return $this->queriesSCB->getUrl($query);
    }
    
    public function getRequestQuery($query, $region) {
        return $this->queriesSCB->getQuery($query ,$region);
    }
    
}
