"use strict";

 function getSCBData() {
    var xhr;
    var  formData="";
    
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");

    for(var x=0;x<regionData.length;x++){
        if (x>0){
           formData += "&"; 
        }
        formData += "Region[]="; 
        formData += regionData[x].value;
    }
    for(var x=0;x<criteriaData.length;x++){
        formData += "&"; 
        formData += "Criteria[]="; 
        formData += criteriaData[x].value;
    }

    $.ajax({
        url : "index.php",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            localStorage["response"] = data;
            myRegionInfo.init();
            //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });

/*
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if((xhr.readyState === 4) && (xhr.status === 200)) {
            	localStorage["response"] = xhr.responseText; 
        }
    };
    xhr.open("POST", "Model/GetSCBData.php", true);
    xhr.send();
     */
    
};





var myRegionInfo = {
    init: function(){
        
        document.getElementById("kalle").addEventListener("click",getSCBData);
        
        
        map = initMap();
//        getSCBData();
        var randomScalingFactor = function() {
           return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
       };
       
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

        
/*
var data = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 127, 90]
        }
    ]
};




        var ctx = document.getElementById('myChart').getContext('2d');
        var myNewChart = new Chart(ctx).Line(data);
*/
   
//        var TrafficMessagesFunc = new TrafficMessages(url);
//        attachCheckboxHandlers();


    }      
};
window.addEventListener("load", myRegionInfo.init());