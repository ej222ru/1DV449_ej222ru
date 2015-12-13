"use strict";

var messages = "";
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
    id.replace(/b/g, '')
    var newId = "t" + id ;
    var node = document.getElementById(newId);
    if (node.className === "Hide")
        node.setAttribute("class", "Show");
    else
        node.setAttribute("class", "Hide");

};
      

function sortTrafficMessages(){
  
    var msgArea = document.getElementById("trafficMessages");  
    var i;
    
    msgArea.innerHTML = "";
    deleteMarkers();
               for (i=0;i<messages.length ;i++){
                    
                if (checkCategory(messages[i].subcategory)) 
                {
/*                    
                    var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
                    var header = messages[i].title;
                    var description = '<b>' + messages[i].subcategory + '</b>' + '</br>';
                    description += messages[i].description + '</br>' + messages[i].exactlocation;
                    addMarker(pos, map, header, description);
*/                    
                    var msg = document.createElement("DIV");
                    msg.setAttribute("class", "Message");
                    var header = document.createTextNode(messages[i].title);
                    msg.appendChild(header);

                    var button = document.createElement("BUTTON");
                    var id = i;
                    button.setAttribute("id", id);
                    button.onclick = function() {toggleButton(this.id)};
                    var buttonText = document.createTextNode("Info");
                    button.appendChild(buttonText);

                    
                    var msgText = document.createElement("DIV");
                    
                    var date = parseJsonDate(messages[i].createddate);
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
                    id = "t"+i;
                    msgText.setAttribute("id", id);

//                    button.addEventListener("click", toggleButton(msgText));
                    msg.appendChild(button);

                    msg.appendChild(msgText);
                    
                    
                    
                    msgArea.appendChild(msg);
               
                    var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
                    var header = messages[i].title;
                    var description = '<b>' + messages[i].subcategory + '</b>' + '</br>';
                    description += messages[i].description + '</br>' + messages[i].exactlocation;
                    addMarker(pos, map, header, description);
           
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
            categories[i].onclick = sortTrafficMessages;
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

        
        var reply;
        var i;
        var xmlhttp = new XMLHttpRequest();
        var msgArea = document.getElementById("trafficMessages");  
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                reply = JSON.parse(xmlhttp.responseText);
                messages = reply["messages"];
                
                messages.sort(sort_by('createddate', true, function(a){return parseJsonDateToInt(a)}));
                
                sortTrafficMessages();                
/*                
                for (i=0;i<messages.length ;i++){
                    
if (checkCategory(messages[i].subcategory)) 
{
                    
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
                    var id = i;
                    button.setAttribute("id", id);
                    button.onclick = function() {toggleButton(this.id)};
                    var buttonText = document.createTextNode("Info");
                    button.appendChild(buttonText);

                    
                    var msgText = document.createElement("DIV");
                    
                    var date = parseJsonDate(messages[i].createddate);
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
                    id = "t"+i;
                    msgText.setAttribute("id", id);

//                    button.addEventListener("click", toggleButton(msgText));
                    msg.appendChild(button);

                    msg.appendChild(msgText);
                    
                    
                    
                    msgArea.appendChild(msg);
                    
                    var pos = {lat: messages[i].latitude, lng:  messages[i].longitude};
                    var header = messages[i].title;
                    var description = '<b>' + messages[i].subcategory + '</b>' + '</br>';
                    description += messages[i].description + '</br>' + messages[i].exactlocation;
                    addMarker(pos, map, header, description);
                }
         }                
   */                 
            }
        
        };
        
        
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
       
    

        this.start = function(){

//            var aArea = document.getElementById("trafficMessages");  
//            aArea.value = "";


        };
        
        
};

var myTrafficMessages = {
    init: function(url){
        map = initMap();
        var TrafficMessagesFunc = new TrafficMessages(url);
   //     TrafficMessagesFunc.start();
        attachCheckboxHandlers();
    }      
};
window.addEventListener("load", myTrafficMessages.init("http://api.sr.se/api/v2/traffic/messages?format=json&size=100"));