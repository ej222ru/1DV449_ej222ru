<?php

namespace model;

class QueriesSCB {
    
    
    public function getUrl($query){
        $url;
         if ($query == "Income"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110G/Tab4bDispInkN";
         }
         else if ($query == "IllHealth"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003I/IntGr10Kom";
         }
        return $url;
    }
    
    
    public function translateRegion2Code($region){
        $regionCode;
        switch($region){
            case "Botkyrka"         : $regionCode = '"0127"'; break;
            case "Danderyd"         : $regionCode = '"0162"'; break;
            case "Ekerö"            : $regionCode = '"0125"'; break;
            case "Haninge"          : $regionCode = '"0136"'; break;
            case "Huddinge"         : $regionCode = '"0126"'; break;
            case "Järfälla"         : $regionCode = '"0123"'; break;
            case "Nacka"            : $regionCode = '"0182"'; break;
            case "Sollentuna"       : $regionCode = '"0163"'; break;
            case "Solna"            : $regionCode = '"0184"'; break;
            case "Stockholm"        : $regionCode = '"0180"'; break;
            case "Sundbyberg"       : $regionCode = '"0183"'; break;
            case "Tyresö"           : $regionCode = '"0138"'; break;
            case "Täby"             : $regionCode = '"0160"'; break;
            case "Upplands Väsby"   : $regionCode = '"0114"'; break;
            case "Värmdö"           : $regionCode = '"0120"'; break;
            default:break;
        }
        return $regionCode;
    }

    public function getQuery($query, $regionCode){

    if ($query == "Income"){    
        $q = '{
          "query": [
            {
              "code": "Region",
              "selection": {
                "filter": "vs:RegionKommun07EjAggr",
                "values": [
                  ' . $regionCode . '
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
    }
    else if ($query = "IllHealth"){
         $q = '{
          "query": [
            {
              "code": "Region",
              "selection": {
                "filter": "item",
                "values": [
                  ' . $regionCode . '
                ]
              }
            },
            {
              "code": "Bakgrund",
              "selection": {
                "filter": "vs:IntegrationBakgrundFödelseland",
                "values": [
                  "TOT"
                ]
              }
            },
            {
              "code": "ContentsCode",
              "selection": {
                "filter": "item",
                "values": [
                  "AA00038G"
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
    };
    return $q;
}
    
    
    
}
