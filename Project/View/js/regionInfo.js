"use strict";

var myRegionInfo = {
    init: function(url){
        map = initMap();
//        var TrafficMessagesFunc = new TrafficMessages(url);
//        attachCheckboxHandlers();
    }      
};
window.addEventListener("load", myRegionInfo.init("http://api.sr.se/api/v2/traffic/messages?format=json&size=200"));