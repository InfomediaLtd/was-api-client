function outputError(html) {
    output("<span style='color:red'>" + html + "</span>");
}
function output(html) {
    var outputElement = document.getElementById("output");
    outputElement.innerHTML = "<span style='color:gray'>" + outputElement.innerHTML + "</span><label>" + html + "</label><br/>";
}

function post(url, dataToPost, callback) {
    call(url, "POST", dataToPost, callback);
}
function get(url, callback) {
    call(url, "GET", null, callback);
}

function call(url, method, dataToPost, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            } else {
                var errorMessage = (xmlhttp.responseText?xmlhttp.responseText:"HTTP Reqeust Failed" + ". URL: " + url);
                outputError(errorMessage);
            }
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Accept","application/json");

    if (accessToken) {
        // set authorization token in header
        xmlhttp.setRequestHeader("Authorization", accessToken);
    }

    xmlhttp.send(dataToPost);
}