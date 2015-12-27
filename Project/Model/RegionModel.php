<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RegionModel
 *
 * @author User
 */

namespace model;

require_once("model/QueriesSCB.php");

class RegionModel {
    //put your code here
    private $queriesSCB;
    
    public function __construct() {
        $this->queriesSCB = new \model\QueriesSCB();
    }   
    
    public function getRequestUrl($query) {
        return $this->queriesSCB->getUrl($query);
    }
    
    public function getRequestQuery($query, $region) {
        return $this->queriesSCB->getQuery($query ,$this->queriesSCB->translateRegion2Code($region));
    }
    
}
