var request = require('request');
var querystring = require('querystring');

var client_id = 'd307b17ff40b454d9a7e54ddb70a180b'; // Your client id
var client_secret = '2e08498d4777431d92c685bb9c3cf7f3'; // Your secret

exports.get_index = function (req, res, next) {
    res.render('index',
        {
            title: 'Collabs',
            app_explanation: 'Collabs is a website to find tracks where your favourite artists collaborate them artists.',
            explanation: 'Type in any artists you like to check all their collaborated tracks.'
        });
}

exports.get_artists = function (req, res, next) {
    // console.log("Artists: ", req.body.input_artists);

    var aritst_name = req.body.input_artists;
    var artist_or_track = "artist"
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
                
                if (result.length != 0) result = result[0];

                let query = querystring.stringify({
                    "searched_name": aritst_name,
                    "artists": result
                });
                res.redirect('/artist_results/?' + query);
            });
        } else {
            res.redirect('/error');
        }
    });
}