var accessToken = "";

var baseUrl = "http://ie-internal-infomedia-api-70-was-1.superservice.com/v1";
//var baseUrl = "http://api-sandbox.superservice.com/v1";

function login() {

    var url = baseUrl + "/auth/login";

    if (document.all.refreshToken.value.length>0) {
        // login with refresh token
        output("Logging in with refresh token...");
        url = url + "?refreshToken=" + document.all.refreshToken.value;
    } else {
        // login with username and password
        output("Logging in with username and password...");
        url = url + "?username=" + document.all.username.value + "&password=" + document.all.password.value;
    }

    post(url, null, function(resultJson) {
        var result = JSON.parse(resultJson);
        if (result && result.accessToken) {

            // save token to be used later
            accessToken = result.accessToken;

            var link = "http://jwt.io/#id_token=" + accessToken.replace("Bearer ","");
            output("Logged in successfuly. View token details <a href='" + link + "'>here</a>.");

            // show the Get Appointments area
            document.all.appointments.style.display="block";

        } else {
            outputError("Couldn't find accessToken in the result " + resultJson)
        }
    });

}

function getAppointments() {

    output("Getting appointments...");

    var url = baseUrl + "/was/appointmentGet";
    var dataToPost = document.all.getAppointmentsRequest.value;

    post(url, dataToPost, function(response) {

        // format JSON
        var formattedResponse = JSON.stringify(JSON.parse(response), null, "\t");
        formattedResponse = formattedResponse.replace(/([,{}])/g,"$1<br/>").replace(/\t/g,"&nbsp;&nbsp;");

        output("Received the following response:<br/>" + formattedResponse);
    });
}
