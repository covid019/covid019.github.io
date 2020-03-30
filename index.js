const body = document.getElementById("main")
body.innerHTML = "Hello World!"

fetch("https://api.covid19api.com/summary")
    .then((resp) => resp.json())
    .then(data => console.log(data.Countries[4].NewDeaths))
    .catch(err => console.log(err))






console.log("node server is not running world@019covid")
