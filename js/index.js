const body = document.getElementById("main")
const table = document.createElement("table")

body.innerHTML = "Hello World!"

function generateTableHead(table, data) {
    let thead = table.createTHead();
    table.className = "table"
    table.className += " table-striped"
    thead.className = "thead-dark"
    let row = thead.insertRow();
    for (let key in data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
    }
}

function generateTable(table, data) {
    let tHeadData = Object.keys(data.Countries[0]);
    generateTableHead(table,tHeadData);
    let tbody = document.createElement("tbody");
    tbody.className = "table-dark"
    table.appendChild(tbody)
    for (let element of data.Countries) {
    let row = tbody.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        generateTable(table, data);

        console.log((Object(data.Countries[1])))
    })
    .catch(err => console.log(err))



body.appendChild(table)

console.log("node server is not running")