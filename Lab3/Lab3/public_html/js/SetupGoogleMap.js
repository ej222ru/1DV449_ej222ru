"use strict";

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
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });     
} 