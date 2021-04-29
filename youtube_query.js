

var request = require('request');
var querystring = require('querystring');

var API_KEY = ""; // mine. #1

var artists = ["drake"];

var q_artists = function(artists) {
    var result = "";
    for (let i = 0; i < artists.length; i++) {
        result += artists[i] + " & ";
    }
    return result.substring(0, (result.length-3));;
}

let query = querystring.stringify({
    "part": "snippet",
    "maxResults": 10,
    "q": q_artists(artists),
    // "videoEmbeddable": "true",
    "key": API_KEY
});

var request_url = "https://www.googleapis.com/youtube/v3/search?" + query;

request.get(request_url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        JSON.parse(body).items.forEach(element => {
            console.log(element.snippet.title);
        });
        // console.log(JSON.parse(body).items[0].snippet.title);
    } else {
        console.error(JSON.parse(body).error.message);
        console.log(body);
    }
})

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
