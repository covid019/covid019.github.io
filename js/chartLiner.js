let url1 = "https://api.covid19api.com/dayone/country/india/status/confirmed"
let url2 = "https://api.covid19api.com/dayone/country/india/status/recovered"
let url3 = "https://api.covid19api.com/dayone/country/india/status/deaths"

document.getElementById("WConfirmed")
    .addEventListener("click",(e) => {
        e.preventDefault();
        getval(url1).then(values => {renderChart(values,"canvas1")})
    })

document.getElementById("WDeaths")
    .addEventListener("click",(e) => {
        e.preventDefault()
        getval(url3).then(values => {renderChart(values,"canvas1")})
    })

document.getElementById("WRecovered")
    .addEventListener("click",(e) => {
        e.preventDefault()
        getval(url2).then(values => {renderChart(values,"canvas1")})
    })

function extractData(data){
    let extractedData = []
    let date = []
    let cases = []
    for(keys in data){
        date.push(data[keys].Date.slice(6,10))
        cases.push(data[keys].Cases)
    }
    extractedData.push(data[0].Status)
    extractedData.push(date)
    extractedData.push(cases)
    return extractedData

}
function getval(url){
    return fetch(url)
                .then((resp) => resp.json())
                .then(data => {
                    let extractedData = extractData(data)
                    return extractedData
                })
                .catch(err => console.log(err))
}

function renderChart(resp,cnvid){
    let color = window.chartColors.yellow
    if(resp[0] == "confirmed"){
        color = window.chartColors.yellow
    }else if(resp[0] == "deaths"){
        color = window.chartColors.red
    }else if(resp[0] == "recovered"){
        color = window.chartColors.green
    }else{
        console.log("An error occured!")
    }
    let config = {
        type: 'line',
        data: {
            labels: resp[1],
            datasets: [{
                label: resp[0],
                pointRadius: 0,
                backgroundColor: color,
                borderColor: color,
                data: resp[2],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Cases'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            events: [],
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cases'
                    }
                }]
            }
        }
    }
    function plotChart(cnvid) {
        let canvas = document.getElementById(cnvid)
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.myLine = new Chart(ctx, config);
    }
    plotChart(cnvid)
}
getval(url1).then(values => {renderChart(values,"canvas1")})
