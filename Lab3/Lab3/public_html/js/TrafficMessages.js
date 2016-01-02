"use strict";

//var messages = "";
var map;

function parseJsonDate(jsonDateString){
    var date =  new Date(parseInt(jsonDateString.replace('/Date(', '')));
    return date.toLocaleString('sv-SE');
}

function parseJsonDateToInt(jsonDateString){
    return parseInt(jsonDateString.replace('/Date(', ''));
}

var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}




function toggleButton(id){
    var newId = id.replace('b', 't')
    var index = id.substring(1);
    var node = document.getElementById(newId);
    if (node.className === "Hide"){
        node.setAttribute("class", "Show");
        toggleBounce(markers[index]);
    }
    else{
        node.setAttribute("class", "Hide");
        toggleBounce(markers[index]);
    }
};
      

function renderTrafficMessages(){

    var reply = JSON.parse(localStorage["response"]);
    var messages = reply["messages"];
    messages.sort(sort_by('createddate', true, function(a){return parseJsonDateToInt(a)}));
    
    var msgArea = document.getElementById("trafficMessages");  
    var i;
    var j=0;
    msgArea.innerHTML = "<h2>Trafikmeddelanden</h2>";
    deleteMarkers();
    for (i=0;i<messages.length ;i++){
                    
        if (checkCategory(messages[i].subcategory)) 
        {
            var date = parseJsonDate(messages[i].createddate);
            
            var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
            var header = messages[i].title ;
            var description = '<b>' + messages[i].subcategory + '   ' + date + '</b>' + '</br>';
            description += messages[i].description + '</br>' + messages[i].exactlocation;
            addMarker(pos, map, header, description);


            var msg = document.createElement("DIV");
            msg.setAttribute("class", "Message");
            var header = document.createTextNode(messages[i].title);
            msg.appendChild(header);

            var button = document.createElement("BUTTON");
            var id = "b"+j;
            button.setAttribute("id", id);
            button.onclick = function() {toggleButton(this.id)};
            var buttonText = document.createTextNode("Info");
            button.appendChild(buttonText);

            var msgText = document.createElement("DIV");

            
            msgText.innerHTML = date;

            var subcategory = document.createElement("DIV");
            subcategory.innerHTML =  messages[i].subcategory;
            subcategory.setAttribute("class", "Subcategory")
            var info = document.createTextNode(messages[i].description);
            var location = document.createTextNode(messages[i].exactlocation);
            msgText.appendChild(subcategory);
            msgText.appendChild(info);
            msgText.appendChild(location);
            msgText.setAttribute("class", "Hide");
            id = "t"+j;
            msgText.setAttribute("id", id);

            msg.appendChild(button);
            msg.appendChild(msgText);
            msgArea.appendChild(msg);

            j++;
        }
    }                
}


function attachCheckboxHandlers() {
    // get reference to element containing toppings checkboxes
    var el = document.getElementById('categoryForm');

    // get reference to input elements in toppings container element
    var categories = el.getElementsByTagName('input');
    
    // assign updateTotal function to onclick property of each checkbox
    for (var i=0, len=categories.length; i<len; i++) {
        if ( categories[i].type === 'checkbox' ) {
            categories[i].onclick = renderTrafficMessages;
        }
    }
}

function checkCategory(category){
    var b;
    if (category === "Halkvarning")
        b = document.getElementsByName("Halkvarning")[0].checked;
    else if (category === "Trafikolycka")
        b = document.getElementsByName("Trafikolycka")[0].checked;
    else if (category === "Trafikstörning")
        b = document.getElementsByName("Trafikstörning")[0].checked;
    else if (category === "Vägarbete")
        b = document.getElementsByName("Vägarbete")[0].checked;
    else 
        b = document.getElementsByName("Övrigt")[0].checked;
    
    return b;
}



function TrafficMessages(url) {

        var messages = "";
        var reply;
        var i;
        var xmlhttp = new XMLHttpRequest();
        var msgArea = document.getElementById("trafficMessages");  
        var date = new Date();
        var now = date.getTime();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                localStorage["response"] = xmlhttp.responseText;
                localStorage.setItem("lastDataRead", now);
                renderTrafficMessages(); 
            }
        };
        
        var lastDataRead = localStorage.getItem("lastDataRead");
        var test = now - localStorage.getItem("lastDataRead") - 60000;
        if ((localStorage["response"] === null) || (localStorage.getItem("lastDataRead") === null) || (test > 0)){
            console.log("read from SR    now:" + now + "---" + "last read from SR:" + localStorage.getItem("lastDataRead") + "  diff:" + test);   
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        else{
            console.log("read from cache   now:" + now + "---" + "last read from SR:" + localStorage.getItem("lastDataRead") + "  diff:" + test);   
            renderTrafficMessages(messages);
        }
};

var myTrafficMessages = {
    init: function(url){
        map = initMap();
        var TrafficMessagesFunc = new TrafficMessages(url);
        attachCheckboxHandlers();
    }      
};
window.addEventListener("load", myTrafficMessages.init("http://api.sr.se/api/v2/traffic/messages?format=json&size=200"));