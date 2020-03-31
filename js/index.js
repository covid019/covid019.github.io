const body = document.getElementById("main")
const table = document.createElement("table")

const date = document.createElement("p")
date.className = "text-center"
date.innerHTML = new Date().toDateString()
body.appendChild(date)

function generateTableHead(table, data) {
    let thead = table.createTHead();
    table.className = "table"
    table.className += " table-striped"
    thead.className = "thead-dark"
    let row = thead.insertRow();
    for (let key in data) {
        if(key == 1){
            continue;
        }
        let th = document.createElement("th");
        let text = document.createTextNode(data[key]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    let tHeadData = Object.keys(data[0]);
    generateTableHead(table,tHeadData);
    let tbody = document.createElement("tbody");
    tbody.className = "table-dark"
    table.appendChild(tbody)
    for (let element of data) {
    let row = tbody.insertRow();
        for (key in element) {
            if(key == "Slug" || element["TotalConfirmed"] == 0){
                continue;
            }
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
function calcSum(data){
    let sumObj = []
    let sumDeath = 0
    let sumConfirmed = 0
    let sumRecovered = 0
    for(let i = 0; i<data.length ; i++){
        sumDeath += data[i]["TotalDeaths"];
        sumConfirmed += data[i]["TotalConfirmed"];
        sumRecovered += data[i]["TotalRecovered"];
    }
    sumObj.push({"Total Deaths":sumDeath})
    sumObj.push({"Total Comfirmed":sumConfirmed})
    sumObj.push({"Total Recovered":sumRecovered})
    return sumObj

}
function createTotal(data){
    let totalsArr = calcSum(data)
    const total = document.getElementById("total")
    for(let i = 0; i < 3; i++){
        li = document.createElement("li")
        li.className = "list-group-item"
        li.className += " bg-dark"
        h4 = document.createElement("h4")
        h3 = document.createElement("h3")
        h4.className = "text-center"
        h3.className = "font-weigth-bold"
        h3.className += " text-center"
        for(key in totalsArr[i])
            h4.innerHTML = key 
            h3.innerHTML = totalsArr[i][key]
        li.appendChild(h4)
        li.appendChild(h3)
        total.appendChild(li)
    }
}

function sortData(table,data){
    let arr = Object.values(data.Countries)
    let arr2 = arr.slice(0)
            .sort((a,b)  => {return a.TotalConfirmed - b.TotalConfirmed})
            .reverse()
    generateTable(table,arr2)
    createTotal(arr2)
}

fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        sortData(table, data);
    })
    .catch(err => console.log(err))



body.appendChild(table)