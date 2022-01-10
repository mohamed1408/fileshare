document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = []
    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        files.push(f.path)
    }
    console.log(files)
    axios_post('http://localhost:8060' + '/add', files, respText => {
        console.log(respText.data)
        generateList(respText.data)
    }, error => {
        console.log(error)
    })
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space', event);
});

document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
});

// function httpGetAsync(theUrl, method, data, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open(method, theUrl, true); // true for asynchronous 
//     xmlHttp.send(JSON.stringify(data));
// }

function axios_post(theUrl, data, scallback, ecallback) {
    axios.post(theUrl, data)
        .then(function (response) {
            scallback(response)
        })
        .catch(function (error) {
            ecallback(error)
        });
}

function generateList(array) {
    var listDiv = document.getElementById("fileList")
    listDiv.innerHTML = ""
    listDiv.innerText = ""
    let ul = document.createElement('ul')
    array.forEach(path => {
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.innerText = path.split("\\")[path.split("\\").length - 1]
        li.appendChild(span)
        ul.appendChild(li)
    });
    listDiv.appendChild(ul)
}
