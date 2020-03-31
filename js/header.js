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
    
    const span = document.createElement("span")
    span.setAttribute("aria-hidden","true")
    span.innerHTML = "X"

    button.appendChild("span")

    const ul = document.createElement("ul")
    ul.className = "list-group list-group-flush"

    createList(countryObj,ul)
    div2.appendChild(button)
    div2.appendChild(ul)
    div.appendChild(div2)
    
}

<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                </div>

fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => {
        alertBox(data)
    })
    .catch(err => console.log(err))