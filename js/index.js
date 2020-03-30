const body = document.getElementById("main")
const table = document.createElement("table")
const date = document.createElement("p")
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

function sortData(table,data){
    let arr = Object.values(data.Countries)
    let arr2 = arr.slice(0)
            .sort((a,b)  => {return a.TotalConfirmed - b.TotalConfirmed})
            .reverse()
    generateTable(table,arr2)
}
fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        sortData(table, data);
    })
    .catch(err => console.log(err))



body.appendChild(table)

console.log("node server is not running")