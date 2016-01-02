"use strict";

 function getSCBData() {
    var  formData="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    var first = true;
    
    console.log("getSCBData");
 
    for(var x=0;x<regionData[0].childElementCount;x++){    
        if (regionData[0][x].selected){
            if (!first){
               first = true; 
            }
            else
            {
               formData += "&"; 
            }
            formData += "Region[]="; 
            formData += regionData[0][x].value;
        }
    }
    for(var x=0;x<criteriaData[0].childElementCount;x++){
        if (criteriaData[0][x].selected){
            formData += "&"; 
            formData += "Criteria[]="; 
            formData += criteriaData[0][x].value;
        }
    }
    var json="[";
    var arr={};
    var first = true;
    var missing = false;
    for(var x=0;x<regionData[0].childElementCount;x++){
        if (regionData[0][x].selected){
            for(var y=0;y<criteriaData[0].childElementCount;y++){
                 if (criteriaData[0][y].selected){
                     
                    var test = localStorage[regionData[0][x].value+criteriaData[0][y].value];
                    if(test != undefined){
                        arr = {
                            "Region":regionData[0][x].value,
                            "Criteria":criteriaData[0][y].value,
                            "Value":localStorage[regionData[0][x].value+criteriaData[0][y].value]
                        };
                        if (!first){
                            json +=',';
                        }
                        first = false;
                        json += JSON.stringify(arr);
                    }
                    else{
                       missing = true; 
                    }
                }
            }
        }
    }
    json +=']';

    localStorage["response"] = json;

    if (missing){

        $.ajax({
            url : "index.php",
            type: "POST",
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
                    localStorage["response"] = data;

                    var value = localStorage["response"]; 
                    var json = JSON.parse(value);
                    var items = json.length;                
                    for (var i=0; i<items; i++){
                        localStorage[json[i]["Region"]+json[i]["Criteria"]] = json[i]["Value"];
                    }

                    document.getElementById('chartContainer').className = "Show";
                    document.getElementById('error').className = "Hide";
                }
                myRegionInfo.init();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                localStorage.removeItem("response");
            }
        });
    }
    else{
        document.getElementById('chartContainer').className = "Show";
        document.getElementById('error').className = "Hide";
        myRegionInfo.init();        
    }
};







