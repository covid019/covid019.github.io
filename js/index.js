const body = document.getElementById("main")
const table = document.createElement("table")
const total = document.getElementById("total")

function showDate(body){
    const date = document.createElement("p")
    date.className = "text-center"
    date.innerHTML = new Date().toDateString()
    body.appendChild(date)
}
showDate(body)
function createList(data,ul){

    for(let i = 0; i < data.length; i++){
        li = document.createElement("li")
        li.className = "list-group-item"
        li.className += " bg-dark"
        h4 = document.createElement("h4")
        h3 = document.createElement("h3")
        h4.className = "text-center"
        h3.className = "font-weigth-bold"
        h3.className += " text-center"
        for(key in data[i])
            h4.innerHTML = key 
            h3.innerHTML = data[i][key]
        li.appendChild(h4)
        li.appendChild(h3)
        ul.appendChild(li)
    }
}
function alertBox(data){
    let countryObj = []
    countryObj.push({"Country":data.Country})
    countryObj.push({"Total Deaths":data.TotalDeaths})
    countryObj.push({"Total Comfirmed":data.TotalConfirmed})
    countryObj.push({"Total Recovered":data.TotalRecovered})


    const div = document.getElementById("alertBox")

    const div2 = document.createElement("div")
    div2.className = "alert alert-warning alert-dismissible fade show"
    div2.setAttribute("role","alert")

    const button = document.createElement("button")
    button.className = "close"
    button.setAttribute("data-dismiss","alert")
    button.setAttribute("aria-label","Close")
    
    const dataspan = document.createElement("span")
    dataspan.setAttribute("aria-hidden","true")
    dataspan.innerHTML = "X"

    button.appendChild(dataspan)

    const ul = document.createElement("ul")
    ul.className = "list-group list-group-flush"

    createList(countryObj,ul)
    div2.appendChild(button)
    div2.appendChild(ul)
    div.appendChild(div2)
    
}
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
            if(key == "Country"){
                let a = document.createElement("a")
                a.href = "#"
                a.innerHTML = element[key]
                a.addEventListener("click",(e) => {e.preventDefault; return alertBox(element)})
                cell.appendChild(a)
            }else{
                let text = document.createTextNode(element[key])
                cell.appendChild(text)
            }
           
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

function removeDuplicate(data){
    let data2 = []
    for(let i = 0;i<(data.length-1);i++){
        if(data[i]["Slug"] != data[i+1]["Slug"]){
            data2.push(data[i])
        }
    }
    return data2
}

function sortData(data){
    let arr = Object.values(data.Countries)
    let arr2 = removeDuplicate(arr.slice(0)
        .sort((a,b)  => {return a.TotalConfirmed - b.TotalConfirmed})
        .reverse())
    return arr2
    
}

function allFunctions(table,data,total){
    let arr2 = sortData(data);
    generateTable(table,arr2)
    let totalsArr = calcSum(arr2)
    createList(totalsArr,total)
}

fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        allFunctions(table,data,total)
    })
    .catch(err => console.log(err))



body.appendChild(table)