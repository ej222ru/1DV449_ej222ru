"use strict";

 function getSCBData() {
    var xhr;
    var  formData="";
    var test="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    var first = true;
     
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
            localStorage["response"] = data;
            myRegionInfo.init();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });

    
};


var myRegionInfo = {
    init: function(){
        
        document.getElementById("getSCB").addEventListener("click",getSCBData);
        
        map = initMap();
       
        var getRegion = function() {
           var value = localStorage["response"]; 
           return value;
        };

     var barChartData = {
        labels: ["Income", "Health"],
        datasets: [{
            label: getRegion(),
            backgroundColor: "rgba(220,220,220,0.5)",
            yAxisID: "y-axis-1",
            data: [113]
        }, {
            label: getRegion(),
            backgroundColor: "rgba(220,220,220,0.5)",
            yAxisID: "y-axis-2",
            data: [0,14]
        }, {
            label: 'Dataset 2',
            backgroundColor: "rgba(151,187,205,0.5)",
            yAxisID: "y-axis-1",
            data: [85]
        }, {
            label: 'Dataset 2',
            backgroundColor: "rgba(151,187,205,0.5)",
            yAxisID: "y-axis-2",
            data: [0,18]
        }]

    };
    
        
        var ctx = document.getElementById('myChart').getContext('2d');
        
       var myNewChart = Chart.Bar(ctx, {
            data: barChartData, 
            options: {
                responsive: true,
                hoverMode: 'label',
                hoverAnimationDuration: 400,
                stacked: false,
                scales: {
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "y-axis-2",
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                }
            }
        });

//        var TrafficMessagesFunc = new TrafficMessages(url);
//        attachCheckboxHandlers();


    }      
};
window.addEventListener("load", myRegionInfo.init());