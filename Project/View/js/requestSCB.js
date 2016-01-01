"use strict";

 function getSCBData() {
    var xhr;
    var  formData="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    var first = true;
    
    console.log("getSCBData");
 
  //  localStorage.removeItem("response");

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

    $.ajax({
        url : "index.php",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            var json = JSON.parse(data);
            if (json[0]["error"] == "true"){
                localStorage.removeItem("response");
                var text = json[1]["errorText"];
                document.getElementById('error').innerHTML = text;
                document.getElementById('error').className = "Show";
            }
            else{
                localStorage["response"] = data;
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
};







