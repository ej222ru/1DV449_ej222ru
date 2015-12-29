"use strict";

 function getSCBData() {
    var xhr;
    var  formData="";
    var test="";
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]");
    var first = true;

     /*
    var example = document.getElementById("example-getting-started");
    var ex_sel = example.selectedIndex;
    var ex_selOpt = example.selectedOptions;
    var v;
    for(var x=0;x<ex_sel;x++){    
        v = ex_selOpt[x].value;
    }
    for(var x=0;x<ex_selOpt.length;x++){    
        v = ex_selOpt[x].value;
    }
    
    
*/    
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
        
          
        $(document).ready(function() {
            $('#RegionId').multiselect({
                buttonText: function(options, select) {
                    if (options.length === 0) {
                        return 'Välj kommuner ';
                    }
                    else if (options.length > 3) {
                        return 'Mer än tre 3 valda!';
                    }
                     else {
                         var labels = [];
                         options.each(function() {
                             if ($(this).attr('label') !== undefined) {
                                 labels.push($(this).attr('label'));
                             }
                             else {
                                 labels.push($(this).html());
                             }
                         });
                         return labels.join(', ') + '';
                     }
                }
            });
        });
            
        $(document).ready(function() {
            $('#CriteriaId').multiselect({
                buttonText: function(options, select) {
                    if (options.length === 0) {
                        return 'Välj jämförelsetal ';
                    }
                    else if (options.length > 3) {
                        return 'Mer än tre 3 valda!';
                    }
                     else {
                         var labels = [];
                         options.each(function() {
                             if ($(this).attr('label') !== undefined) {
                                 labels.push($(this).attr('label'));
                             }
                             else {
                                 labels.push($(this).html());
                             }
                         });
                         return labels.join(', ') + '';
                     }
                }
            });
        });            
        
        map = initMap();
       
        var getRegion = function(index) {
           var value = localStorage["response"]; 
           var json = JSON.parse(value);
           var jsonL = json.length;
           var region = json[index-1];
           
//           var val2 = JSON.parse(val1);
           return region["Region"];
        };
        var getCriteria = function(index) {
           var value = localStorage["response"]; 
           var json = JSON.parse(value);
           var jsonL = json.length;
           var region = json[index-1];
           
//           var val2 = JSON.parse(val1);
           return region["Criteria"];
        };
        var getValue = function(index) {
           var value = localStorage["response"]; 
           var json = JSON.parse(value);
           var jsonL = json.length;
           var region = json[index-1];
           
//           var val2 = JSON.parse(val1);
           return region["Value"];
        };

        var barChartData = {
        labels: [getCriteria(1), getCriteria(2)],
        datasets: [{
            label: getRegion(1),
            backgroundColor: "rgba(220,220,220,0.5)",
            yAxisID: "y-axis-1",
            data: [getValue(1)]
        }, {
            label: getRegion(2),
            backgroundColor: "rgba(220,220,220,0.5)",
            yAxisID: "y-axis-2",
            data: [0,getValue(2)]
        }, {
            label: getRegion(3),
            backgroundColor: "rgba(151,187,205,0.5)",
            yAxisID: "y-axis-1",
            data: [getValue(3)]
        }, {
            label: getRegion(4),
            backgroundColor: "rgba(151,187,205,0.5)",
            yAxisID: "y-axis-2",
            data: [0,getValue(4)]
        }]

    };
    
        
        document.getElementById('myChart').className = "Show";
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