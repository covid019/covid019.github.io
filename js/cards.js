function createTotal(){
    const total = document.getElementById("total")
    const ul = document.createElement("ul")
    ul.className = "list-group"
    ul.className += " list-group-flush"
    for(let i;i < 3;i++){
        li = document.createElement("li")
        li.className = "list-group-item"
        li.className += " bg-dark"
        h4 = document.createElement("h4")
        h4.innerHTML = ""
        p = document.createElement("p")
        p.innerHTML = ""
        li.appendChild(h4)
        li.appendChild(p)
        ul.appendChild(li)
    }
    total.appendChild(ul)
}