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
})