"use strict";





function sortLocalAndRemote(local, respons){

    dataComb += data.substr(1, data.length-1);
    var responsSplit = respons.substr(1, respons.length-1);
    responsSplit = responsSplit.split(","); 
    
    
    var jsonL = JSON.parse(local);
    var itemsL = json.length;   
    var arrL;
    for (var i=0; i<itemsL; i++){
        arrL[jsonL[i]["Region"]] = jsonL[i]["Criteria"];
    }


    function exist(regionR, criteriaR){
        for (var i=0; i<itemsL; i++){
            if (arrL[regionR] == criteriaR)
                return true;
        }        
        return false;
    }

    var jsonR = JSON.parse(respons);
    var itemsR = json.length;                
    for (var i=0; i<itemsR; i++){
        exist(jsonR[i]["Region"], jsonR[i]["Criteria"]);
    }
    
    
}

 function getSCBData() {
    var  formData="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    
    console.log("getSCBData");
 /*
    for(var x=0;x<regionData[0].childElementCount;x++){    
        if (regionData[0][x].selected){
            formData += "&"; 
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
    
*/    
    var json="[";
    var jsonPartReply="";
    
    var arr={};
    var first = true;
    var missing = false;
    var lastMissingRegion = 999;  // "random init value > 2. Cant initiate to 0 since that will match the first in check below
    var lastMissingCriteria = 999;  // "random init value > 1. Cant initiate to 0 since that will match the first in check below
    localStorage.removeItem("responsePart");
    for(var x=0;x<regionData[0].childElementCount;x++){
        if (regionData[0][x].selected){
            for(var y=0;y<criteriaData[0].childElementCount;y++){
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
                        missing = true; 
                        if (lastMissingRegion != x){
                            formData += "&"; 
                            formData += "Region[]="; 
                            formData += regionData[0][x].value;
                            lastMissingRegion = x;
                        }
                        if (lastMissingCriteria != y){
                            formData += "&"; 
                            formData += "Criteria[]="; 
                            formData += criteriaData[0][y].value;    
                            lastMissingCriteria = y;
                        }
                    }
                }
            }
        }
    }
    json +=']';

    localStorage["response"] = json;
    localStorage["responsePart"] = jsonPartReply;
    

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
                    
                    if (localStorage["responsePart"] != undefined){
                        // Part of the request answer already existed in the localStorage and was placed in localStorage["responsePart"] 
                        // now add the remaing reply 
                        
                        sortLocalAndRemote(localStorage["response"], data);
                        
                        
                        var dataComb = "[";
                        dataComb += localStorage["responsePart"];
                        dataComb += ',';
                        dataComb += data.substr(1, data.length-1);
                        localStorage["response"] = dataComb;
                        sortLocalAndRemote();
                    }
                    else {
                        localStorage["response"] = data;
                    }
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







