var files = []
axios_get(window.origin + '/files', data => {
    console.log(data.data)
}, error => {
    console.log(error)
})
httpGetAsync(window.origin + '/files', (responseText) => {
    console.log(responseText)
    files = JSON.parse(responseText)
    document.getElementById("fileList")
})



function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function axios_get(theUrl, scallback, ecallback) {
    axios.get(theUrl)
        .then(function (response) {
            console.log(response);
            scallback(response)
        })
        .catch(function (error) {
            console.log(error);
            ecallback(error)
        });
}