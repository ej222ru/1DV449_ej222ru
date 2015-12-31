<?php

namespace model;

class QueriesSCB {
    
    
    public function getUrl($query){
        $url = "index.php";
         if ($query == "Inkomst rel riket"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110G/Tab4bDispInkN";
         }
         else if ($query == "Ohälsotal dagar"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003I/IntGr10Kom";
         }
         else if ($query == "Röstdeltagande"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003J/IntGr9Kom1";
         }
         else if ($query == "Andel egna hem"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003D/IntGr6Kom";
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
            case "Vallentuna"       : $regionCode = '"0115"'; break;
            case "Värmdö"           : $regionCode = '"0120"'; break;
            case "Österåker"        : $regionCode = '"0117"'; break;
            default:break;
        }
        return $regionCode;
    }

    public function getQuery($query, $regionCode){

    if ($query == "Inkomst rel riket"){    
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
    else if ($query == "Ohälsotal dagar"){
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
    }         
    else if ($query == "Röstdeltagande"){
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
                  "filter": "item",
                  "values": [
                    "300"
                  ]
                }
              },
              {
                "code": "Tid",
                "selection": {
                  "filter": "item",
                  "values": [
                    "2014"
                  ]
                }
              }
            ],
            "response": {
              "format": "json"
            }
        }';   
    }        
    else if ($query == "Andel egna hem"){
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
                "filter": "vs:ÅlderInt3KL0-65+Ag",
                "values": [
                  "totalt"
                ]
              }
            },
            {
              "code": "ContentsCode",
              "selection": {
                "filter": "item",
                "values": [
                  "AA0003M1"
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
