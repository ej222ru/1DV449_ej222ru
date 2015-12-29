"use strict";


function setupRegionSelectBox(){
    $(document).ready(function() {
        $('#RegionId').multiselect({
            buttonText: function(options, select) {
                if (options.length === 0) {
                    return 'Välj kommuner ';
                }
                else if (options.length > 2) {
                      // Disable all other checkboxes.
                      var nonSelectedOptions = $('#RegionId option').filter(function() {
                          return !$(this).is(':selected');
                      });

                      var dropdown = $('#RegionId').siblings('.multiselect-container');
                      nonSelectedOptions.each(function() {
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', true);
                          input.parent('li').addClass('disabled');
                      });                        
                }
                else {
                    // Enable all checkboxes.
                    var dropdown = $('#RegionId').siblings('.multiselect-container');
                    $('#RegionId option').each(function() {
                        var input = $('input[value="' + $(this).val() + '"]');
                        input.prop('disabled', false);
                        input.parent('li').addClass('disabled');
                    });
                }
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
        });
    });
}

function setupCriteriaSelectBox(){
    $(document).ready(function() {
        $('#CriteriaId').multiselect({
            buttonText: function(options, select) {
                if (options.length === 0) {
                    return 'Välj jämförelsetal ';
                }
                else if (options.length > 1) {
                      // Disable all other checkboxes.
                      var nonSelectedOptions = $('#CriteriaId option').filter(function() {
                          return !$(this).is(':selected');
                      });

                      var dropdown = $('#CriteriaId').siblings('.multiselect-container');
                      nonSelectedOptions.each(function() {
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', true);
                          input.parent('li').addClass('disabled');
                      });                        
                }
                else {
                    // Enable all checkboxes.
                     var dropdown = $('#CriteriaId').siblings('.multiselect-container');
                     $('#CriteriaId option').each(function() {
                         var input = $('input[value="' + $(this).val() + '"]');
                         input.prop('disabled', false);
                         input.parent('li').addClass('disabled');
                     });
                }
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
        });
    });            
}


function setupBarChart(){
    
        var getBarChartInfo = function(type, index) {
           var value = localStorage["response"]; 
           var json = JSON.parse(value);
           var region = json[index-1];
           return region[type];
        };

        var barChartData = {
            labels: [getBarChartInfo("Criteria", 1), getBarChartInfo("Criteria",2)],
            datasets: [{
                label: getBarChartInfo("Region", 1),
                backgroundColor: "rgba(220,220,220,0.5)",
                yAxisID: "y-axis-1",
                data: [getBarChartInfo("Value", 1)]
                }, {
                label: getBarChartInfo("Region", 2),
                backgroundColor: "rgba(220,220,220,0.5)",
                yAxisID: "y-axis-2",
                data: [0,getBarChartInfo("Value", 2)]
                }, {
                label: getBarChartInfo("Region", 3),
                backgroundColor: "rgba(151,187,205,0.5)",
                yAxisID: "y-axis-1",
                data: [getBarChartInfo("Value", 3)]
                }, {
                label: getBarChartInfo("Region", 4),
                backgroundColor: "rgba(151,187,205,0.5)",
                yAxisID: "y-axis-2",
                data: [0,getBarChartInfo("Value", 4)]
                }]
        };
    
        document.getElementById('myChart').className = "Show";
        var ctx = document.getElementById('myChart').getContext('2d');
        
        Chart.Bar(ctx, {
            data: barChartData, 
            options: {
                responsive: true,
                hoverMode: 'label',
                hoverAnimationDuration: 400,
                stacked: false,
                scales: {
                    yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear",
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
    
}

var myRegionInfo = {
    init: function(){
        
        document.getElementById("getSCB").addEventListener("click",getSCBData);
        
        var ret = setupRegionSelectBox();
        setupCriteriaSelectBox();
        
        var value = localStorage["response"];
        if ((value == 'Undefined') || (value == 'undefined')) {
            alert(value);
        }
        else {    
            setupBarChart()
        }
        
        map = initMap();
       
       
   
//        attachCheckboxHandlers();


    }      
};
window.addEventListener("load", myRegionInfo.init());