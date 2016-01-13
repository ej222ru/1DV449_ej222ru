"use strict";

function renderPoliceReports(){

    var policeReports = [];
    
    // Slightly move a position if it already exist one at the same position
    function modifyPosIfDuplicate(lat, lng, posIndex, pos){
        var duplicates = 0;
        for (var i=0; i<posIndex; i++){
            if ((parseFloat(lat[i].childNodes[0].nodeValue) == parseFloat(lat[posIndex].childNodes[0].nodeValue)) &&
                (parseFloat(lng[i].childNodes[0].nodeValue) == parseFloat(lng[posIndex].childNodes[0].nodeValue))) {
                duplicates++;
                var newLat = parseFloat(lat[posIndex].childNodes[0].nodeValue) + duplicates*0.01;
                var newLng = parseFloat(lng[posIndex].childNodes[0].nodeValue) + duplicates*0.01;
                pos = {lat: newLat,lng: newLng};
            }
        }
        return pos;
    }

    // display all police reports in the map when checkbox is checked
    // Either get them from local storage if they already have been fethed
    if (document.getElementById("policeReportsCheckBox").checked == true){
        localStorage["displayPoliceReports"] = "Show";
        
        // Either get police reports from localStorage or the source
        // either way they are put in localStorage after call to getPoliceReports()
        getPoliceReports();
        
        if (localStorage["policeReports"] != undefined){
            
            //get police reports from local storage, parse them and push them to
            // the array policeReports
            var xmlDoc1 = jQuery.parseXML(localStorage["policeReports"]);
            if (xmlDoc1) {
                var lat = xmlDoc1.getElementsByTagName("lat");
                var lng = xmlDoc1.getElementsByTagName("lng");
                var descrip = xmlDoc1.getElementsByTagName("description");
                var place = xmlDoc1.getElementsByTagName("place");
                var text = xmlDoc1.getElementsByTagName("text");
                var event = xmlDoc1.getElementsByTagName("event");
                for (var i=0;i<event.length;i++){
                    var msg = [];
                    var pos = {lat: parseFloat(lat[i].childNodes[0].nodeValue), lng:  parseFloat(lng[i].childNodes[0].nodeValue)};
                    pos = modifyPosIfDuplicate(lat, lng, i, pos);
                    msg["pos"] = pos;
                    msg["header"] = descrip[i].childNodes[0].nodeValue
                    msg["descript"] = place[i].childNodes[0].nodeValue;
                    msg["text"] = text[i].childNodes[0].nodeValue;
                    policeReports.push(msg);
                }
            }           
            // creat a marker in the map for all police reports from array policeReports
            for (var i=0;i<policeReports.length ;i++){
                var pos = policeReports[i]["pos"]
                var header = policeReports[i]["header"];
                var description = '<b>' + policeReports[i]["descript"] + '</br>' + '</b>' + policeReports[i]["text"];
                addMarker(pos, map, header, description, "policeReports");
            }
        }
    }
    else{
        localStorage["displayPoliceReports"] = "Hide";        
        clearMarkers();
        markRegionOnMap();
    };
}

function attachCrimeCheckboxHandler() {
    var crimeForm = document.getElementById('crimeForm');
    var checkBox = crimeForm.getElementsByTagName('input');
    
    // assign renderPoliceReports function to onclick property of checkbox
    if ( checkBox[0].type === 'checkbox' ) {
        checkBox[0].onclick = renderPoliceReports;
    }
}



// Get police reports from the web if not existing in localStorage or if they have not
// been read from that source recently (initially set to within last minute)
function getPoliceReports() {
    
    var date = new Date();
    var now = date.getTime();
    var lastDataRead = localStorage.getItem("lastDataRead");
    var test = now - lastDataRead - 60000;
    if ((localStorage["policeReports"] === null) || (lastDataRead === null) || (test > 0)){
        console.log("read from brottsstatistik now:" + now + "---" + "last read from brottsstatistik:" + lastDataRead + "  diff:" + test);   
        var formData = "&Crime=true"; 
        $.ajax({
             url : "index.php",
             type: "POST",
             async:false,
             data : formData,
             datatype : "text",
             success: function(data, textStatus, jqXHR)
             {
                localStorage["policeReports"] = data; // police reports from a xml-file in text format
                localStorage["lastDataRead"] = now;
             },
             error: function (jqXHR, textStatus, errorThrown)
             {
             }
        });
    }
    else{
        console.log("read from cache   now:" + now + "---" + "last read from brottsstatistik:" + localStorage.getItem("lastDataRead") + "  diff:" + test);   
    }
}
