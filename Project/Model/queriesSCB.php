<?php

namespace model;

class QueriesSCB {
    
    // Url to query differnt tables from SCB
    public function getUrl($query){
        $url = "index.php";
         if ($query == "Inkomst rel riket"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110G/Tab4bDispInkN";
         }
         else if ($query == "Kommunal skattesats"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/OE/OE0101/Kommunalskatter2000";
         }
         else if ($query == "Ohälsotal dagar"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003I/IntGr10Kom";
         }
         else if ($query == "Röstdeltagande"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003J/IntGr9Kom1";
         }
         else if ($query == "Egna hem"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003D/IntGr6Kom";
         }
         else if ($query == "Egna hem,utlandsfödda exkl EU"){
            $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/AA0003/AA0003D/IntGr6Kom";
         }
         else if ($query == "Medelålder"){
             $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101B/BefolkningMedelAlder";
         }
         else if ($query == "Rapporterade brott"){
             $url = "http://brottsplatskartan.se/api.php?action=getEvents&period=1440&area=Stockholms%20L%C3%A4n";
         }
             //
         //
        // TEST err code $url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AA/BB0003/AA0003D/IntGr6Kom";
          
        return $url;
    }
    
    // Translate to offcial "kommunkoder" used by SCB API
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

    // Specific queries described by SCB API 
    public function getQuery($query, $region){
        $regionCode = $this->translateRegion2Code($region);
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
        else if ($query == "Kommunal skattesats"){    
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
                    "code": "ContentsCode",
                    "selection": {
                      "filter": "item",
                      "values": [
                        "OE0101D1"
                      ]
                    }
                  },
                  {
                    "code": "Tid",
                    "selection": {
                      "filter": "item",
                      "values": [
                        "2015"
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
        else if ($query == "Medelålder"){
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
                  "code": "Kon",
                  "selection": {
                    "filter": "item",
                    "values": [
                      "1+2"
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
        else if ($query == "Egna hem"){
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
        }
        else if ($query == "Egna hem,utlandsfödda exkl EU"){
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
                        "VXEUEES"
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
