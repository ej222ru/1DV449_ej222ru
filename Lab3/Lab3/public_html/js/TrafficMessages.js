"use strict";

function TrafficMessages(url) {

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
        
//         document.getElementById("getQButton").addEventListener("click", this.getQButtonClicked);
//        document.getElementById("sendAButton").addEventListener("click", this.sendAButtonClicked);
//        var aArea = document.getElementById("questionOutput");  
//        aArea.value = "Klicka på 'Hämta fråga!";
//        var qArea = document.getElementById("answerInput");  
//        qArea.value = "Skriv ditt svar här";        
//        var rArea = document.getElementById("resultOutput");  
//        rArea.innerHTML = "";   
//        var tArea = document.getElementById("totalResult");  
//        tArea.innerHTML = "";   
        
//        var getAButton = document.getElementById("sendAButton");  
//        getAButton.style.color = "transparent";      
//        getAButton.style.background = "transparent";  
//        var getQButton = document.getElementById("getQButton");  
//        getQButton.style.background = "green";            
    };
        
        
}

var myTrafficMessages = {
    init: function(url){
      var TrafficMessagesFunc = new TrafficMessages(url);
      TrafficMessagesFunc.start();
      

    }      
};
window.addEventListener("load", myTrafficMessages.init("http://api.sr.se/api/v2/traffic/messages?format=json&size=100"));