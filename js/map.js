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
    return d > 80000  ? '#000000' :
           d > 10000  ? '#440101' :
           d > 1000   ? '#c90202' :
           d > 200    ? '#fc3a3a' :
                        '#ffeda0' ;
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
    }).addTo(map)
})