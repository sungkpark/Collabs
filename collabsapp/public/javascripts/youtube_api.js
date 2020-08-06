var API_KEY = "AIzaSyAHEZF1Bf1i8fnEMND-1tZSCSccwQihVhc";
var CLIENT_ID = "913028800386-0v4li55a68f25s0cls5r3jpu0f3l72g0.apps.googleusercontent.com";

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}


// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(artists) {
    var q = "";
    for (let i = 0; i < artists.length; i++) {
        q += artists[i] + " & ";
    }
    q = q.substring(0, (q.length-3));

    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "maxResults": 10,
        "q": q
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
            function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: CLIENT_ID });
});

