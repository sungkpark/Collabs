var request = require('request');
// var Buffer = require('buffer');
// import request from '/request';
// import Buffer from '/buffer';

var client_id = 'd307b17ff40b454d9a7e54ddb70a180b'; // Your client id
var client_secret = '2e08498d4777431d92c685bb9c3cf7f3'; // Your secret

// module.exports = function get_artist(name) {
window.get_artist = function(name, callback) {
    var aritst_name = name;
    var artist_or_track = "artist";
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

    if (aritst_name == "") {
        console.log("Please enter a name of an artist.");
    } else {
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
                    if (artist_or_track == "artist") {
                        body.artists.items.forEach(element => {
                            result.push(element.name);
                        });
                    } else {
                        body.tracks.items.forEach(element => {
                            result.push(element.name);
                        });
                    }
                    callback(result);
                });
            } else {
                console.log("Error while searching on spotify.");
            }
        });
    }
}