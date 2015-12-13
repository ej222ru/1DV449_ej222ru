"use strict";

var markers = [];
var openInfoWindow = "";

function initMap() {
    var map;
    var uluru = {lat: 58.7, lng: 16}; 
    map = new google.maps.Map(document.getElementById('map'), {
       center: uluru,
       zoom: 7
    });
    
  return map;  
}

function addMarker(pos, map, heading, text){
    var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' + heading + '</h1>'+
          '<div id="bodyContent">'+
          text +
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: heading
      });
      markers.push(marker);
      
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        if (openInfoWindow != ""){
            openInfoWindow.close();
        }
        openInfoWindow = infowindow;
      });
      marker.setAnimation(null);
} 

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}