//var mapboxAccessToken = {"pk.eyJ1IjoiY292aWQiLCJhIjoiY2s4aTBudWU4MDE1dzNub2NobnlkOWQwMyJ9.etd5wk2VX0dHCxx61GllAw"};
//var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
//     id: 'mapbox/light-v9',
//     attribution: ...,
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);

// L.geoJson(statesData).addTo(map);

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY292aWQiLCJhIjoiY2s4aTBudWU4MDE1dzNub2NobnlkOWQwMyJ9.etd5wk2VX0dHCxx61GllAw'
}).addTo(mymap);