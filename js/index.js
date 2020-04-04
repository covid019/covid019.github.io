const body = document.getElementById("main")
const table = document.createElement("table")
const total = document.getElementById("total")

// function showDate(body){
//     const date = document.createElement("H1")
//     date.className = "text-center"
//     date.innerHTML = new Date().toDateString()
//     body.appendChild(date)
// }

//defined in date.js
showDate(body)

function allFunctions(table,data,total){

    //calling sorting function
    let arr2 = sortData(data);

    //generating table
    generateTable(table,arr2)

    //calculation total data
    let totalsArr = calcSum(arr2)

    //creating list data
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