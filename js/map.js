let promiseArr = []

promiseArr.push(fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        return data
    })
    .catch(err => console.log(err))
)

promiseArr.push(fetch("assets/geojson/custom.geo.json")
    .then(response => response.json())
    .then(json => { 
        return json
    })
    .catch(err => console.log(err))
)

function getColor(d) {
    return d > 10000 ? '#800026' :
           d > 5000  ? '#BD0026' :
           d > 2000  ? '#E31A1C' :
           d > 1000  ? '#FC4E2A' :
           d > 500   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(features) {
    return {
        fillColor: getColor(features.properties.confirmed),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.7
    };
}
//data[0] => covid api data                 data[1] => geoJson data
Promise.all(promiseArr).then((data)=>{
    for(countries of data[0].Countries){
        for(keys of data[1].features){
            if(countries.Country == keys.properties.name){
                keys.properties.confirmed = countries.TotalConfirmed
            }
        }
    }
    var map = L.map('map').setView([39.74739, 7], 1);

    L.geoJson(data, {
        clickable: false,
        style: style
    }).addTo(map);
})