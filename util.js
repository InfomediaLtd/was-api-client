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
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(request.responseText);
            } else {
                outputError(getErrorMessage(request, url));
            }
        }
    };
    request.open(method, url, true);
    request.setRequestHeader("Accept","application/json");

    if (accessToken) {
        // set authorization token in header
        request.setRequestHeader("Authorization", accessToken);
    }

    request.send(dataToPost);
}

// produce a nice error message based on the information in the request
function getErrorMessage(request, url) {

    console.log(request);

    var errorMessage = "HTTP Request Failed. URL: " + url;
    if (request.responseText && request.responseText.indexOf("{") == 0) {
        try {
            var responseJson = JSON.parse(request.responseText);
            if (responseJson) {
                if (responseJson.status) {
                    errorMessage = "HTTP Request failed with status " + responseJson.status;
                }
                if (responseJson.errors && responseJson.errors.length > 0) {
                    errorMessage = errorMessage + " : " + responseJson.errors[0].description;
                }
            }
        } catch (e) {
            // ignore
        }
    }
    return errorMessage;
}