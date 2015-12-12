"use strict";

function TrafficMessages(url, map) {

        var messages;
        var reply;
        var i;
        var xmlhttp = new XMLHttpRequest();
        var msgArea = document.getElementById("trafficMessages");  
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                reply = JSON.parse(xmlhttp.responseText);
                messages = reply["messages"];
                
                for (i=0;i<messages.length ;i++){
                    
                    var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
                    var header = messages[i].title;
                    var description = '<b>' + messages[i].subcategory + '</b>' + '</br>';
                    description += messages[i].description + '</br>' + messages[i].exactlocation;
                    addMarker(pos, map, header, description);
                    
                    var msg = document.createElement("DIV");
                    msg.setAttribute("class", "Message");
                    var header = document.createTextNode(messages[i].title);
                    msg.appendChild(header);

                    var button = document.createElement("BUTTON");

                    var buttonText = document.createTextNode("Info");
                    button.appendChild(buttonText);  
                    msg.appendChild(button);
                    
                    var msgText = document.createElement("DIV");
                    var info = document.createTextNode(messages[i].description);
                    msgText.appendChild(info);
    
                    msg.appendChild(msgText);
                    
                    
                    
                    msgArea.appendChild(msg);
/*                    
                    msgArea.innerHTML += "<div class=Message>";
                    msgArea.innerHTML += "<div class=MessageHeader>";
                    msgArea.innerHTML += messages[i].title;
                    msgArea.innerHTML += "</div>";
                    msgArea.innerHTML += "<button type=button class=btn btn-info data-toggle=collapse data-target=#demo>" + "X" + "</button>";
                    msgArea.innerHTML += "<div id=demo class=collapse>";
                    msgArea.innerHTML += description;
                    msgArea.innerHTML += "</div>";
                    msgArea.innerHTML += "</div>";
*/                    
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
        
        
        this.start = function(){

//            var aArea = document.getElementById("trafficMessages");  
//            aArea.value = "";


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