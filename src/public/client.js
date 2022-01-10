var files = []
axios_get(window.origin + '/files', data => {
    console.log(data.data)
    generateList(data.data)
}, error => {
    console.log(error)
})

function generateList(array) {
    var listDiv = document.getElementById("fileList")
    let ul = document.createElement('ul')
    array.forEach(path => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.innerText = path.split("\\")[path.split("\\").length - 1]
        a.href = window.origin + '/download?file=' + path
        li.appendChild(a)
        ul.appendChild(li)
    });
    listDiv.appendChild(ul)
}

function axios_get(theUrl, scallback, ecallback) {
    try {
        axios.get(theUrl)
            .then(function (response) {
                // console.log(response);
                scallback(response)
            })
            .catch(function (error) {
                // console.log(error);
                ecallback(error)
            });
    } catch {
        setTimeout(function () {
            axios_get(theUrl, scallback, ecallback)
        }, 500);
    }
}