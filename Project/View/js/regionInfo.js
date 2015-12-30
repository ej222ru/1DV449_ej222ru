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
    
        document.getElementById('chartContainer').className = "Hide";

        var getBarChartInfo = function(type, index) {
           var value = localStorage["response"]; 
           var json = JSON.parse(value);
           var jsonL = json.length;
           
            if (type == "Labels"){
                if (jsonL % 2 == 0){
                    if (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2)){
                        return [getBarChartInfo("Criteria", 1)];
                    }
                    else {
                        return [getBarChartInfo("Criteria", 1), getBarChartInfo("Criteria",2)];
                    }
                }
                else {
                    return [getBarChartInfo("Criteria", 1)];
                }
            }
            if (type == "YAxis"){
                if (jsonL % 2 == 0){
                    if ((index % 2) != 0){
                        return "y-axis-1";
                    }
                    else{
                        return "y-axis-2";
                    }
                }
                else {
                    return "y-axis-1";
                }
            }
            if (type == "bgColor"){
                if (index > jsonL){
                    return ""; 
                }
                else {
                    if (jsonL % 2 == 0){
                        // Special condition to decide if two region values are for two regions and one criteria
                        // or one region for two criteria
                        if ((jsonL == 2) && (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2))){
                            if (index == 1){
                                return "rgba(255,0,0,0.5)";
                            }
                            else {
                                return "rgba(86,66,232,0.5)";
                            }
                        }                        
                        else if ((index == 1) || (index ==2)){
                            return "rgba(255,0,0,0.5)";
                        }
                        else if ((index == 3) || (index ==4)){
                            return "rgba(86,66,232,0.5)";
                        }
                        else {
                            return "rgba(20,255,0,0.5)";
                        }
                    }
                    else{
                        if ((index == 1) || (index == 4)){
                            return "rgba(20,255,0,0.5)";
                        }
                        else if ((index == 2)|| (index == 5)){
                            return "rgba(255,0,0,0.5)";
                        }
                        else if ((index == 3)|| (index == 6)){
                            return "rgba(86,66,232,0.5)";
                        }
                    }
                }
            }
            if (type == "Value"){
                if (index > jsonL){
                    return ""; 
                }
                else{
                    var region = json[index-1];
                    // Special condition to decide if two region values are for two regions and one criteria
                    // or one region for two criteria
                    if ((jsonL == 2) && (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2))){
                            return [region[type], 0];
                    }
                    else if (jsonL % 2 == 0){
                        if ((index % 2) != 0){
                            return [region[type], 0];
                        }
                        else{
                            return [0, region[type]];
                        }
                    }
                    else {
                        var check = [region[type], 0];
                        return [region[type], 0];
                    }
                }
            }
            else {
                if (index > jsonL){
                    return ""; 
                }
                else
                {
                 var region = json[index-1];
                 return region[type];
                }               
            }
        };
        
        var barChartData = {
            labels: getBarChartInfo("Labels", 0),
            datasets: [{
                label: getBarChartInfo("Region", 1),
                backgroundColor: getBarChartInfo("bgColor", 1),
                yAxisID: getBarChartInfo("YAxis", 1),
                data: getBarChartInfo("Value", 1)
                }, {
                label: getBarChartInfo("Region", 2),
                backgroundColor: getBarChartInfo("bgColor", 2),
                yAxisID: getBarChartInfo("YAxis", 2),
                data: getBarChartInfo("Value", 2)
                }, {
                label: getBarChartInfo("Region", 3),
                backgroundColor: getBarChartInfo("bgColor", 3),
                yAxisID: getBarChartInfo("YAxis", 3),
                data: getBarChartInfo("Value", 3)
                }, {
                label: getBarChartInfo("Region", 4),
                backgroundColor: getBarChartInfo("bgColor", 4),
                yAxisID: getBarChartInfo("YAxis", 4),
                data: getBarChartInfo("Value", 4)
                }, {
                label: getBarChartInfo("Region", 5),
                backgroundColor: getBarChartInfo("bgColor", 5),
                yAxisID: getBarChartInfo("YAxis", 5),
                data: getBarChartInfo("Value", 5)
                }, {
                label: getBarChartInfo("Region", 6),
                backgroundColor: getBarChartInfo("bgColor", 6),
                yAxisID: getBarChartInfo("YAxis", 6),
                data: getBarChartInfo("Value", 6)
                }]
        };
    
        // Clear out old canvas charts
        document.getElementById("chartContainer").innerHTML = '&nbsp;';
        document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>';
        var ctx = document.getElementById("myChart").getContext("2d");            
        
        var newChart = Chart.Bar(ctx, {
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
        newChart.update();
        //newChart.addData([112,0], "Inkomst");
    
}

var myRegionInfo = {
    init: function(){
        
        document.getElementById("getSCB").addEventListener("click",getSCBData);
        
        var ret = setupRegionSelectBox();
        setupCriteriaSelectBox();
        
        var value = localStorage["response"];
        console.log(value);
        if (value === undefined) {
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