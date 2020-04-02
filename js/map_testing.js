let promiseArr = []

promiseArr.push(fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        console.log(data.Countries[14].Country,data.Countries[14].TotalConfirmed)
        return data
    })
    .catch(err => console.log(err))
)

promiseArr.push(fetch("test.json")
    .then(response => response.json())
    .then(json => { 
        console.log(json.features[0].properties.name)
        return json
    })
    .catch(err => console.log(err))
)
Promise.all(promiseArr).then((data)=>{
    console.log(Object.keys(data))
    if(data[0].Countries[14].Country == data[1].features[0].properties.name){
        console.log("true")
    }
})