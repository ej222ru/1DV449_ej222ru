"use strict";

 function getSCBData() {
    var  formData="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    
//    console.log("getSCBData");
    var json="[";
    var jsonPartReply="";
    
    var arr={};
    var first = true;
    localStorage.removeItem("responsePart");
    for(var x=0;x<regionData[0].childElementCount;x++){
        if (regionData[0][x].selected){
            for(var y=0;y<criteriaData[0].childElementCount;y++){
                 formData="";
                 if (criteriaData[0][y].selected){
                    // check if value for requested region/criteria combination exist in localStorage 
                    var test = localStorage[regionData[0][x].value+criteriaData[0][y].value];
                    if(test != undefined){
                        arr = {
                            "Region":regionData[0][x].value,
                            "Criteria":criteriaData[0][y].value,
                            "Value":localStorage[regionData[0][x].value+criteriaData[0][y].value]
                        };
                        if (!first){
                            json +=',';
                            jsonPartReply +=',';
                        }
                        first = false;
                        json += JSON.stringify(arr);
                        jsonPartReply += JSON.stringify(arr);
                        
                    }
                    else{
                        formData += "&"; 
                        formData += "Region[]="; 
                        formData += regionData[0][x].value;
                        formData += "&"; 
                        formData += "Criteria[]="; 
                        formData += criteriaData[0][y].value;    
                        
                        $.ajax({
                             url : "index.php",
                             type: "POST",
                             async:false,
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
    myRegionInfo.init();        
};







