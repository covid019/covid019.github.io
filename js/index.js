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
function createButton(clsName,btntype,btnid,btnparrent,slug){
    const button = document.createElement("button")
    //button.className = "close"
    button.className = clsName
    button.type = btntype
    button.id = btnid
    button.innerHTML = btnid
    button.addEventListener("click",(e) => {
        e.preventDefault()
        let country = slug
        let status = btnid
        let url = "https://api.covid19api.com/dayone/country/" + country + "/status/" + status
        console.log(url)
        getval(url).then(values => {renderChart(values,"canvas2")})
    })
    btnparrent.appendChild(button)
}

function createCanvas(id,canParent,slug){
    const candiv = document.createElement("div")
    candiv.style.width = "100%"
    candiv.className = "d-flex justify-content-center"
    const canvas = document.createElement("canvas")
    canvas.id = id
    canvas.addEventListener("DOMNodeInserted",(e) => {
        e.preventDefault()
        console.log("working")
        let country = slug
        let status = "confirmed"
        let url = "https://api.covid19api.com/dayone/country/" + country + "/status/" + status
        console.log(url)
        getval(url).then(values => {renderChart(values,"canvas2")})
    })
    candiv.appendChild(canvas)
    canParent.appendChild(candiv)
}

function btnWrapper(wrapParrent,slug){
    const wrapdiv = document.createElement("div")
    wrapdiv.className = "d-flex text-white  flex-wrap justify-content-center"
    createButton("btn btn-dark","button","confirmed",wrapdiv,slug)
    createButton("btn btn-dark","button","deaths",wrapdiv,slug)
    createButton("btn btn-dark","button","recovered",wrapdiv,slug)
    wrapParrent.appendChild(wrapdiv)
}

function alertBox(data){
    let countryObj = [{"Country":data.Country},
                      {"Total Deaths":data.TotalDeaths},
                      {"Total Comfirmed":data.TotalConfirmed},
                      {"Total Recovered":data.TotalRecovered}]

    let slug = data.Slug

    const div = document.getElementById("alertBox")
    if(document.getElementById("alertBoxData") != null){
        div.removeChild(document.getElementById("alertBoxData"))
    }
    const div2 = document.createElement("div")
    div2.className = "alert alert-warning alert-dismissible fade show bg-dark"
    div2.setAttribute("role","alert")
    div2.id = "alertBoxData"


    //close button
    const button = document.createElement("button")
    button.className = "close"
    button.setAttribute("data-dismiss","alert")
    button.setAttribute("aria-label","Close")
    const dataspan = document.createElement("span")
    dataspan.setAttribute("aria-hidden","true")
    dataspan.innerHTML = "X"
    button.appendChild(dataspan)

    //card for canvas and data:totals
    const div3 = document.createElement("div")
    div3.className = "card-deck"


    //card for canvas and buttons
    const div4 = document.createElement("div")
    div4.className = "card bg-dark"
    const div4_1 = document.createElement("div")
    div4_1.className = "card-body"
    btnWrapper(div4_1,slug)
    createCanvas("canvas2",div4_1,slug)

    

    div4.appendChild(div4_1)

    //card for data list -- totals
    const div5 = document.createElement("div")
    div5.className = "card bg-dark"
    const div5_1 = document.createElement("div")
    div5_1.className = "card-body"
    div5.appendChild(div5_1)
    const ul = document.createElement("ul")
    ul.className = "list-group list-group-flush"
    createList(countryObj,ul)


    div3.appendChild(div4)
    div3.appendChild(div5)
    div2.appendChild(div3)
    div2.appendChild(button)
    div5_1.appendChild(ul)
    div.appendChild(div2)
    
}
function generateTableHead(table, data) {
    let thead = table.createTHead();
    table.className = "table  table-striped"
    thead.className = "thead-dark sticky-top"
    let row = thead.insertRow();
    for (let key in data) {
        if(key == 1 || key == 2 || key == 4 || key == 6){
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
            if(key == "Slug" || key == "NewConfirmed" || key == "NewDeaths" || key == "NewRecovered" || element["TotalConfirmed"] == 0){
                continue;
            }
            let cell = row.insertCell();
            if(key == "Country"){
                let a = document.createElement("a")
                a.href = "#"
                a.innerHTML = element[key]
                a.addEventListener("click",(e) => {e.preventDefault; return alertBox(element)})
                cell.appendChild(a)
            }else if(key == "TotalConfirmed"){
                let p = document.createElement("p")
                let p2 = document.createElement("span")
                p2.className = "font-weight-lighter font-italic text-warning"
                p.innerHTML = element[key]
                p2.innerHTML = " new " + element["NewConfirmed"]
                p.appendChild(p2)
                cell.appendChild(p)
            }else if(key == "TotalDeaths"){
                let p = document.createElement("p")
                let p2 = document.createElement("span")
                p2.className = "font-weight-lighter font-italic text-danger"
                p.innerHTML = element[key]
                p2.innerHTML = " new " + element["NewDeaths"]
                p.appendChild(p2)
                cell.appendChild(p)
            }else if(key == "TotalRecovered"){
                let p = document.createElement("p")
                let p2 = document.createElement("span")
                p2.className = "font-weight-lighter font-italic text-success"
                p.innerHTML = element[key]
                p2.innerHTML = " new " + element["NewRecovered"]
                p.appendChild(p2)
                cell.appendChild(p)
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
        return data
    })
    .catch(err => console.log(err))

body.appendChild(table)