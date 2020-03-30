let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
];

const table = document.createElement("table")
const body =  document.getElementById("body")
function generateTableHead(table, data) {
    let thead = table.createTHead();
    table.className = "table"
    table.className += " table-striped"
    thead.className = "thead-dark"
    let row = thead.insertRow();
    for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
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
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
generateTable(table, mountains);
body.appendChild(table)