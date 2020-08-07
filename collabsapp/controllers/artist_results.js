var request = require('request');
var querystring = require('querystring');

var API_KEY = "AIzaSyAHEZF1Bf1i8fnEMND-1tZSCSccwQihVhc";

var artist_results = [];

var q_artists = function (artists) {
    var result = "";
    for (let i = 0; i < artists.length; i++) {
        result += artists[i] + " & ";
    }
    return result.substring(0, (result.length - 3));;
}

exports.show_artist = function (req, res, next) {
    var searched_name = req.query.searched_name[0].toUpperCase() + req.query.searched_name.substring(1);
    artist_results.push(req.query.artists);
    
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
                    title: 'Collabs',
                    app_explanation: 'Collabs is a website to find tracks where your favourite artists collaborate them artists.',
                    explanation: 'Type in any artists you like to check all their collaborated tracks.',
                    searched_name: searched_name,
                    artists: artist_results,
                    tracks: tracks
                });
        }
    })
}

exports.get_index = function (req, res, next) {
    artist_results = [];
    res.redirect('/');
}