"use strict";

function TrafficMessages(url, map) {

        var messages;
        var reply;
        var i;
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                reply = JSON.parse(xmlhttp.responseText);
                messages = reply["messages"];
                
                for (i=0;i<messages.length ;i++){
                    
                    aArea.innerHTML += "<div>";
                    aArea.innerHTML += messages[i].exactlocation;
                    aArea.innerHTML += "</div>";
                    var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
                    var header = messages[i].title;
                    var description = '<b>' + messages[i].subcategory + '</b>' + '</br>';
                    description += messages[i].description + '</br>' + messages[i].exactlocation;
                    addMarker(pos, map, header, description);
                    
                    
                }
                
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
        var aArea = document.getElementById("trafficMessages");  
        aArea.innerHTML = "";
        
        
        this.start = function(){

            var aArea = document.getElementById("trafficMessages");  
            aArea.value = "";


        };
        
        
}

var myTrafficMessages = {
    init: function(url){
        var map = initMap();
        var TrafficMessagesFunc = new TrafficMessages(url, map);
   //     TrafficMessagesFunc.start();
    }      
};
window.addEventListener("load", myTrafficMessages.init("http://api.sr.se/api/v2/traffic/messages?format=json&size=100"));