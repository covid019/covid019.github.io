// initialize the map on the "map" div with a given center and zoom
// var map = new L.Map('map', {
//     center: new L.LatLng(51.46, -0.205),
//     zoom: 1
//   });


// let key = "7cd92f92efbc403c81598c84cde4512f"
//   // create a new tile layer
// var tileUrl = 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + key,
// layer = new L.TileLayer(tileUrl, {maxZoom: 18});

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(700),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var myGeoJSONPath = 'assets/geojson/custom.geo.json';
var myCustomStyle = {
    stroke: false,
    fill: true,
    fillColor: '#b1b1b1',
    fillOpacity: 1
}
$.getJSON(myGeoJSONPath,function(data){
    var map = L.map('map').setView([39.74739, 7], 1);

    L.geoJson(data, {
        clickable: false,
        style: style
    }).addTo(map);
    console.log()
})
// console.log("mapping...")
// // add the layer to the map
// map.addLayer(layer);