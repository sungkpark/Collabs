var request = require('request');

var client_id = 'd307b17ff40b454d9a7e54ddb70a180b'; // Your client id
var client_secret = '2e08498d4777431d92c685bb9c3cf7f3'; // Your secret

var aritst_name = "Life Is Good";
var artist_or_track = "track"
var artist_url = "https://api.spotify.com/v1/search?q="
    + aritst_name + "&type=" + artist_or_track + "&limit=5";

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

var result = [];

// get_artist();

request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
            url: artist_url,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            // console.log(body.tracks.items[0].name);
            if (artist_or_track == "artist") {
                body.artists.items.forEach(element => {
                    result.push(element.name);
                });
            } else {
                body.tracks.items.forEach(element => {
                    result.push(element.name);
                });
            }
            
            console.log("Track:", result);
        });
    } 
});