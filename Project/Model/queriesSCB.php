<?php

namespace model;

class queriesSCB {
    
    
    public function getUrl(){
        $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110G/Tab4bDispInkN";
        return $url;
    }
    
    public function getQuery(){

    $q = '{
      "query": [
        {
          "code": "Region",
          "selection": {
            "filter": "vs:RegionKommun07EjAggr",
            "values": [
              "0114"
            ]
          }
        },
        {
          "code": "Hushallstyp",
          "selection": {
            "filter": "item",
            "values": [
              "E90"
            ]
          }
        },
        {
          "code": "Alder",
          "selection": {
            "filter": "item",
            "values": [
              "18+"
            ]
          }
        },
        {
          "code": "ContentsCode",
          "selection": {
            "filter": "item",
            "values": [
              "000000KF"
            ]
          }
        },
        {
          "code": "Tid",
          "selection": {
            "filter": "item",
            "values": [
              "2013"
            ]
          }
        }
      ],
      "response": {
        "format": "json"
      }
    }';
    
    return $q;
}
    
    
    
}
