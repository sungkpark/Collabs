var request = require('request');
var querystring = require('querystring');

var API_KEY = "AIzaSyAHEZF1Bf1i8fnEMND-1tZSCSccwQihVhc"; // mine. Number 1
// var API_KEY = "AIzaSyA_yZnjk7V9YbmcLTuIHYlDG97MnVPV0ME"; //misuk e nuna ggu
// var API_KEY = "AIzaSyCztQZhFdkN7jKfkBMK4MXbbSlVKyT30Ro"; // mine. num 2

var artist_results = [];

var q_artists = function (artists) {
    var result = "";
    for (let i = 0; i < artists.length; i++) {
        result += artists[i] + " & ";
    }
    return result.substring(0, (result.length - 3));;
}

exports.insert_artist = function (req, res, next) {
    var searched_name = req.query.artists;

    if (searched_name != "") {
        if (artist_results.includes(searched_name)) {
            console.log("You have already searched for this artist. Select a different artists.");
            return;
        }

        artist_results.push(searched_name);
    } else {
        const index = artist_results.indexOf(req.query.removed_artist);
        if (index > -1) {
            artist_results.splice(index, 1);
        }
    }

    console.log(artist_results);

    let query = querystring.stringify({
        "part": "snippet",
        "maxResults": 10,
        "order": "viewCount",
        "q": q_artists(artist_results),
        // "videoEmbeddable": "true",
        "key": API_KEY
    });

    var request_url = "https://www.googleapis.com/youtube/v3/search?" + query;

    var tracks = [];

    // console.log("Artist results", artist_results);

    request.get(request_url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            JSON.parse(body).items.forEach(element => {
                var track = JSON.stringify({
                    "title": element.snippet.title,
                    "img_url": element.snippet.thumbnails.default.url
                });
                tracks.push(track);
            });
            res.render('artist_results',
                {
                    title: "Collabs",
                    searched_name: searched_name,
                    artists: artist_results,
                    tracks: tracks
                });
        } else {
            console.error(JSON.parse(body).error.message);
        }
    })
}

exports.reset_artists = function (req, res, next) {
    artist_results = [];
    res.redirect('/');
}