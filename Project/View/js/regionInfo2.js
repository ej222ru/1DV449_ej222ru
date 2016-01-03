/* global getSCBData */

"use strict";

var map;

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


function getBarChartTypeInfo(json, items, type, index){
    var ret="";
    
    if (index > items){
        ret = ""; 
    }
    else
    {
        var region = json[index-1];
        ret = region[type];
    } 
    return ret;
}

function getBarChartLabels(items){
    var ret="";
    
    if (items % 2 == 0){
        if (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2)){
            ret = [getBarChartInfo("Criteria", 1)];
        }
        else {
            ret = [getBarChartInfo("Criteria", 1), getBarChartInfo("Criteria",2)];
        }
    }
    else {
        ret = [getBarChartInfo("Criteria", 1)];
    }
    return ret;
}
function getBarChartYAxis(items, index){
    var ret="";    
    if (items % 2 == 0){
        if (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2)){
            ret = "y-axis-1";
        }
        else {
            if ((index % 2) != 0){
                ret = "y-axis-1";
            }
            else{
                ret = "y-axis-2";
            }
        }
    }
    else {
        ret = "y-axis-1";
    }
    return ret;
}
function getBarChartColor(items, index){
    if (index > items){
        return ""; 
    }
    else {
        if (items % 2 == 0){
            // Special condition to decide if two region values are for two regions and one criteria
            // or one region for two criteria
            if ((items == 2) && (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2))){
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

function getBarChartValue(json, items, type, index){
    var ret = "";
    if (index > items){
        ret = ""; 
    }
    else{
        var region = json[index-1];
        // Special condition to decide if two region values are for two regions and one criteria
        // or one region for two criteria
        if ((items == 2) && (getBarChartInfo("Criteria", 1) === getBarChartInfo("Criteria", 2))){
                return [region[type], 0];
        }
        else if (items % 2 == 0){
            if ((index % 2) != 0){
                ret = [region[type], 0];
            }
            else{
                ret = [0, region[type]];
            }
        }
        else {
            var check = [region[type], 0];
            ret = [region[type], 0];
        }
    }    
    return ret;
}
function getBarChartInfo(type, index) {
    var value = localStorage["response"]; 
    var json = JSON.parse(value);
    var items = json.length;

    if (type == "Labels"){
        return getBarChartLabels(items);                
    }
    else if (type == "YAxis"){
        return getBarChartYAxis(items, index);                
    }
    else if (type == "bgColor"){
        return getBarChartColor(items, index);
    }
    else if (type == "Value"){

        return getBarChartValue(json, items, type, index);
    }
    else {
        return getBarChartTypeInfo(json, items, type, index);    
    }
 };


function setupBarChart(){
    
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
}

function getRegionPosition(region){
    var position;
    switch(region){
        case "Botkyrka"         : position = {lat: 59.23, lng: 17.82}; break;
        case "Danderyd"         : position = {lat: 59.4, lng: 18.07}; break;
        case "Ekerö"            : position = {lat: 59.3, lng: 17.85}; break;
        case "Haninge"          : position = {lat: 59.1, lng: 18.2}; break;
        case "Huddinge"         : position = {lat: 59.23, lng: 18.0}; break;
        case "Järfälla"         : position = {lat: 59.43, lng: 17.8}; break;
        case "Nacka"            : position = {lat: 59.3, lng: 18.25}; break;
        case "Sollentuna"       : position = {lat: 59.43, lng: 17.91}; break;
        case "Solna"            : position = {lat: 59.36, lng: 17.98}; break;
        case "Stockholm"        : position = {lat: 59.325, lng: 18.1}; break;
        case "Sundbyberg"       : position = {lat: 59.368, lng: 17.95}; break;
        case "Tyresö"           : position = {lat: 59.245, lng: 18.25}; break;
        case "Täby"             : position = {lat: 59.44, lng: 18.07}; break;
        case "Upplands Väsby"   : position = {lat: 59.51, lng: 17.925}; break;
        case "Vallentuna"       : position = {lat: 59.5, lng: 18.1}; break;
        case "Värmdö"           : position = {lat: 59.3, lng: 18.43}; break;
        case "Österåker"        : position = {lat: 59.46, lng: 18.35}; break;
        default:break;
    }
    return position;
}

/*
 * Caluclates the map center position for one to three positions 
 */
function calcCenterPosition(pos1, pos2, pos3){
    var posLat=0;
    var posLng=0;
    var nbrPos=0;
    var posCenter = 0;
    
    var addPos = function(pos){
        if (pos != undefined){
            posLat += pos["lat"];
            posLng += pos["lng"];
            nbrPos++;
        }
    } 
    addPos(pos1);
    addPos(pos2);
    addPos(pos3);
    
    var posLat = posLat /  nbrPos;
    var posLng = posLng /  nbrPos;
    posCenter = '{ "lat":' + posLat + ',"lng":' + posLng + '}';
    return JSON.parse(posCenter);
}

/*
 * Add markers to the map for the choosen regions in the drop down menu
 */
function markRegionOnMap(){
    var region1 = getBarChartInfo("Region", 1)
    var region2 = getBarChartInfo("Region", 2)
    var region3 = getBarChartInfo("Region", 3)
    
    var pos1 = getRegionPosition(region1);     
    var pos2 = getRegionPosition(region2);     
    var pos3 = getRegionPosition(region3);     
    addMarker(pos1, map, region1, "");
    addMarker(pos2, map, region2, "");
    addMarker(pos3, map, region3, "");
    map.setCenter(calcCenterPosition(pos1, pos2, pos3));
}

/*
 * Toggle info for the drop down menu when clicking Info button
 */
 function displayInfo() {
    var infoId = document.getElementById("displayInfo"); 
    var info = document.getElementById("Info").className; 
    if (info == "Hide"){
        document.getElementById("Info").className = "Show";
        document.getElementById("displayInfo").innerHTML = "Stäng info";
    }
    else {
        document.getElementById("Info").className = "Hide";
        document.getElementById("displayInfo").innerHTML = "Info";
    }
 }
var myRegionInfo = {
    init: function(){
//        localStorage.clear("response");
        document.getElementById("getSCB").addEventListener("click",getSCBData);
        document.getElementById("displayInfo").addEventListener("click",displayInfo);
        
        setupRegionSelectBox();
        setupCriteriaSelectBox();
        
        console.log("myRegionInfo:init()");
        
        var value = localStorage["response"];
        if (value === undefined) {
            console.log("localstorage undefined");
            document.getElementById('chartContainer').className = "Hide";            
        }
        else {    
            console.log(value);
            setupBarChart()
        }
   
        map = initMap();
      
        var cl = document.getElementById('chartContainer').className;
        if (document.getElementById('chartContainer').className == "Show"){
            markRegionOnMap();
        }
    }      
};
window.addEventListener("load", myRegionInfo.init());