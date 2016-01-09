<?php

namespace model;

class QueriesBrottsplatsen {
    public function getUrl(){
        return "http://brottsplatskartan.se/api.php?action=getEvents&period=1440&area=Stockholms Län";
    }
}
