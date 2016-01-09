
"use strict";

var map;

function setupRegionSelectBox(){
    $(document).ready(function() {
        $('#RegionId').multiselect({
            buttonText: function(options, select) {
                if (options.length === 0) {
                    return 'Välj kommuner ';
                }
                else if (options.length > 3) {
                      // Disable all other checkboxes.
                      var nonSelectedOptions = $('#RegionId option').filter(function() {
                          return !$(this).is(':selected');
                      });

                      nonSelectedOptions.each(function() {
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', true);
                          input.parent('li').addClass('disabled');
                      });                        
                }
                else {
                    // Enable all checkboxes.
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
                else if (options.length > 3) {
                      // Disable all other checkboxes.
                      var nonSelectedOptions = $('#CriteriaId option').filter(function() {
                          return !$(this).is(':selected');
                      });

                      nonSelectedOptions.each(function() {
                          var input = $('input[value="' + $(this).val() + '"]');
                          input.prop('disabled', true);
                          input.parent('li').addClass('disabled');
                      });                        
                }
                else {
                    // Enable all checkboxes.
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


function getItem(type, index){
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]"); 
    var ret = "";
    var count = 0;
    if (type == "Region"){
        for(var x=0;x<regionData[0].childElementCount;x++){  
            if (regionData[0][x].selected){
                count++;
                if (count == index){
                    ret = regionData[0][x].value;
                }
            }
        }
    }
    else if (type == "Criteria"){
        for(var x=0;x<criteriaData[0].childElementCount;x++){  
            if (criteriaData[0][x].selected){
                count++;
                if (count == index){
                    ret = criteriaData[0][x].value;
                }
            }
        }        
    }
    return ret;
}




function getSelectedItems(type){
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]"); 
    var ret = 0;
    if (type == "Region"){
        for(var x=0;x<regionData[0].childElementCount;x++){  
            if (regionData[0][x].selected){
                ret++;
            }
        }
    }
    else if (type == "Criteria"){
        for(var x=0;x<criteriaData[0].childElementCount;x++){  
            if (criteriaData[0][x].selected){
                ret++;
            }
        }        
    }
    return ret;
}


function getBarChartTypeInfo(type, index){

    var ret = "";
    if (type == "Region"){
        if (index <= getSelectedItems("Region"))
            ret = getItem("Region", index);
    }
    else if (type == "Criteria"){
        if (index <= getSelectedItems("Criteria"))
            ret = getItem("Criteria", index);
    }
    return ret;
}

function getBarChartLabels(chartIndex){
    var ret="";
    
    if (((chartIndex+1)*2 - getSelectedItems("Criteria") ) == 1){
        ret = [getBarChartTypeInfo("Criteria", 1+(chartIndex*2))];
    }
    else{
        ret = [getBarChartTypeInfo("Criteria", 1+(chartIndex*2)), getBarChartTypeInfo("Criteria", 2+(chartIndex*2))];
    }
    return ret;
}
function getBarChartYAxis(criteriaIndex){
    
    if ((criteriaIndex % 2 == 1)){
        return "y-axis-1";
    }
    else {
        return "y-axis-2";
    }
}
function getBarChartColor(index){
    if (index == 1){
        return "rgba(255,0,0,0.5)";
    }
    else if (index == 2){
        return "rgba(86,66,232,0.5)";
    }
    else if (index == 3){
        return "rgba(20,255,0,0.5)";
    }
}

function getBarChartValue(regionIndex, criteriaIndex){
    var ret = "";
    if ((regionIndex <= getSelectedItems("Region"))
        &&
        (criteriaIndex <= getSelectedItems("Criteria"))){
        if ((criteriaIndex%2) == 1){
            ret = [localStorage[getItem("Region", regionIndex)+getItem("Criteria", criteriaIndex)], 0];
        }
        else{
            ret = [0,localStorage[getItem("Region", regionIndex)+getItem("Criteria", criteriaIndex)]];
        }
    }
    return ret;
}

function setupChartDataset(regionIndex, criteriaIndex){
    return  {
            label:              getBarChartTypeInfo("Region", regionIndex),
            backgroundColor:    getBarChartColor(regionIndex),
            yAxisID:            getBarChartYAxis(criteriaIndex),
            data:               getBarChartValue(regionIndex,criteriaIndex)
            };
    
}
// Setup for a bar chart specified by chartjs
// Setup at most 16 datasets - four regions times four criteria each
function setupBarChart(){
    
    document.getElementById("chartContainer").innerHTML = '&nbsp;';
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart1"></canvas><canvas id="myChart2"></canvas>';

    var charts = getSelectedItems("Criteria")/2;
    for (var chartIndex= 0; chartIndex<charts;chartIndex++){
        var criteriaIndexY1 = 1+(chartIndex*2);
        var criteriaIndexY2 = 2+(chartIndex*2);
        var barChartData = {
            labels: getBarChartLabels(chartIndex),
            datasets: [
                setupChartDataset(1, criteriaIndexY1),
                setupChartDataset(2, criteriaIndexY1),
                setupChartDataset(3, criteriaIndexY1),
                setupChartDataset(4, criteriaIndexY1),
                setupChartDataset(1, criteriaIndexY2), 
                setupChartDataset(2, criteriaIndexY2),
                setupChartDataset(3, criteriaIndexY2),
                setupChartDataset(4, criteriaIndexY2)
            ]
         };

        // Clear out old canvas charts
        var ctx;
        if (chartIndex == 0){
            ctx = document.getElementById("myChart1").getContext("2d");  
        }
        else {
            ctx = document.getElementById("myChart2").getContext("2d");            
        }

        // decide if one or two y-axis for this chart
        var myScales;
        if (((chartIndex+1)*2 - getSelectedItems("Criteria") ) == 1){
            myScales =   {
                        yAxes: [{
                            type: "linear",
                            display: true,
                            position: "left",
                            id: "y-axis-1",
                        }],
                    };
        }
        else {
            myScales = {
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
                    };
        }
        // Create a bar chart object 
        Chart.Bar(ctx, {
            data: barChartData, 
            options: {
                responsive: true,
                hoverMode: 'label',
                hoverAnimationDuration: 400,
                stacked: false,
                scales: myScales,
            }
        });   
    }
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
function calcCenterPosition(pos){
    var posLat=0;
    var posLng=0;
    var nbrPos=0;
    var posCenter = 0;
    var ret = "";
    var addPos = function(pos){
        if (pos != undefined){
            posLat += pos["lat"];
            posLng += pos["lng"];
            nbrPos++;
        }
    } 
    for (var i=0;i<pos.length;i++){
        addPos(pos[i]);
    }

    if (nbrPos != 0){
        var posLat = posLat /  nbrPos;
        var posLng = posLng /  nbrPos;
        posCenter = '{ "lat":' + posLat + ',"lng":' + posLng + '}';
        ret = JSON.parse(posCenter)
    }
    return ret;
}

/*
 * Add markers to the map for the choosen regions in the drop down menu
 */
function markRegionOnMap(){
    var regions = [];
    var pos = [];
    
    for (var i=1; i<=getSelectedItems("Region"); i++){
        regions.push(getBarChartTypeInfo("Region", i));
        pos.push(getRegionPosition(regions[i-1]));    
        addMarker(pos[i-1], map, regions[i-1], "", "region");
    }
    var center = calcCenterPosition(pos);
    if ( center != ""){
        map.setCenter(center);
    }
}

/*
 * Clear localStorage
 */

function refreshLocalStorage(){
    
    var regionData = document.getElementsByName("Region[]");
    var criteriaData = document.getElementsByName("Criteria[]"); 
    // Loop over region & criteria
    for(var y=0;y<criteriaData[0].childElementCount;y++){
        for(var x=0;x<regionData[0].childElementCount;x++){  
            localStorage.clear(regionData[0][x].value+criteriaData[0][y].value);            
        }
    }    
}

/*
 * Toggle info for the drop down menu when clicking Info button
 */
 function displayInfo() {
    var infoId = document.getElementById("displayInfo"); 
    var info = document.getElementById("Info"); 
    if (info.className == "Hide"){
        info.className = "Show";
        infoId.innerHTML = "Stäng info";
    }
    else {
        info.className = "Hide";
        infoId.innerHTML = "Info";
    }
 }
var myRegionInfo = {
    init: function(url){
        document.getElementById("getSCB").addEventListener("click",getSCBData);
        document.getElementById("displayInfo").addEventListener("click",displayInfo);
        document.getElementById("refreshLocalStorage").addEventListener("click",refreshLocalStorage);
        
        setupRegionSelectBox();
        setupCriteriaSelectBox();
        
//        console.log("myRegionInfo:init()");
        
        var value = localStorage["response"];
        if (value === undefined) {
//            console.log("localstorage undefined");
            document.getElementById('chartContainer').className = "Hide";            
        }
        else {    
//            console.log(value);
            setupBarChart();
        }
   
        map = initMap();
      
        if (document.getElementById('chartContainer').className == "Show"){
            markRegionOnMap();
        }
        
        // CrimeMessages();
        attachCrimeCheckboxHandler();        
        
    }      
};
window.addEventListener("load", myRegionInfo.init());