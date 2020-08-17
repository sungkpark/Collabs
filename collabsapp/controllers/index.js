var request = require('request');
var querystring = require('querystring');

exports.show_index = function (req, res, next) {
    res.render('index',
        {
            title: 'Collabs',
            app_explanation: 'Collabs is a website to find tracks where your favourite artists collaborate them artists.',
            explanation: 'Type in any artists you like to check all their collaborated tracks.'
        });
}

exports.insert_artist = function (req, res, next) {
    var input_artist = req.body.input_artists;
    var removed_artist = req.body.removed_artist;

    // console.log(req.body);

    let query = querystring.stringify({
        // "searched_name": aritst_name,
        "artists": input_artist,
        "removed_artist": removed_artist
    });
    res.redirect('/artist_results/?' + query);
}