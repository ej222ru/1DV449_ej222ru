"use strict";


// Either get data from localStorage if it is there or get it from the
// server with in turn reads it from cache or get it from SCB QpenAPI
// When read from server the response will be placed in localStorage for 
// future client requests
// Each combination of region and criteria is stored separately and can thus be retrieved 
// from localStorage while other parts of the request can be fetched from the server
 function getSCBData() {
    var  formData="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    
    if ((getSelectedItems("Region") == 0) || (getSelectedItems("Criteria") == 0)){
        document.getElementById('chartContainer').className = "Hide";
        document.getElementById('error').className = "Show";
        document.getElementById('error').innerHTML = "Du måste välja minst en kommun och ett jämförelsetal";
    }
    else {
        for(var x=0;x<regionData[0].childElementCount;x++){
            if (regionData[0][x].selected){
                for(var y=0;y<criteriaData[0].childElementCount;y++){
                     formData="";
                     if (criteriaData[0][y].selected){
                        // check if value for requested region/criteria combination exist in localStorage 
                        var test = localStorage[regionData[0][x].value+criteriaData[0][y].value];
                        if(test != undefined){
                            console.log("SCBData from localStorage region:" + regionData[0][x].value + " criteria:" + criteriaData[0][y].value);
                        }
                        else{
                            console.log("SCBData from server region:" + regionData[0][x].value + " criteria:" + criteriaData[0][y].value);
                            formData += "&"; 
                            formData += "Region[]="; 
                            formData += regionData[0][x].value;
                            formData += "&"; 
                            formData += "Criteria[]="; 
                            formData += criteriaData[0][y].value;    

                            $.ajax({
                                 url : "index.php",
                                 type: "POST",
                                 async:true,
                                 data : formData,
                                 success: function(data, textStatus, jqXHR)
                                 {
                                     var json = JSON.parse(data);
                                     if (json["error"] == "true"){
                                         localStorage.removeItem("response");
                                         var text = json["errorText"];
                                         document.getElementById('error').innerHTML = text;
                                         document.getElementById('error').className = "Show";
                                     }
                                     else{
                                        localStorage["response"] = "true";
                                        var json = JSON.parse(data);
                                        localStorage[json["Region"]+json["Criteria"]] = json["Value"];
                                     }
                                 },
                                 error: function (jqXHR, textStatus, errorThrown)
                                 {
                                     localStorage.removeItem("response");
                                 }
                             });
                        }
                    }
                }
            }
        }

        document.getElementById('chartContainer').className = "Show";
        document.getElementById('error').className = "Hide";
    }
    myRegionInfo.init();        
};
