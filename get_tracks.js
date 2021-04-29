var request = require('request');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret


function get_artist(query, callback) {

    var aritst_name = query;
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
                callback(result);
            });
        }
    });
}

get_artist("drake", function(result) {
    // 5. Received the result from the async function,
    //    now do whatever you want with it:
    console.log(result);
});



// exports.insert_artist = function (req, res, next) {
//     // console.log("Artists: ", req.body.input_artists);

//     // get_artist(req.body.input_artists);

//     var aritst_name = req.body.input_artists;
//     var artist_or_track = "artist"
//     var artist_url = "https://api.spotify.com/v1/search?q="
//         + aritst_name + "&type=" + artist_or_track + "&limit=5";

//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//         },
//         form: {
//             grant_type: 'client_credentials'
//         },
//         json: true
//     };

//     var result = [];

//     if (aritst_name == "") {
//         console.log("Please enter a name of an artist.");
//     } else {
//         request.post(authOptions, function (error, response, body) {
//             if (!error && response.statusCode === 200) {

//                 // use the access token to access the Spotify Web API
//                 var token = body.access_token;
//                 var options = {
//                     url: artist_url,
//                     headers: {
//                         'Authorization': 'Bearer ' + token
//                     },
//                     json: true
//                 };
//                 request.get(options, function (error, response, body) {
//                     // console.log(body.tracks.items[0].name);
//                     if (artist_or_track == "artist") {
//                         body.artists.items.forEach(element => {
//                             result.push(element.name);
//                         });
//                     } else {
//                         body.tracks.items.forEach(element => {
//                             result.push(element.name);
//                         });
//                     }

//                     if (result.length != 0) result = result[0];

//                     artist_results.push(result);

//                     let query = querystring.stringify({
//                         "searched_name": aritst_name,
//                         "artists": result
//                     });
//                     res.redirect('/artist_results/?' + query);
//                 });
//             } else {
//                 res.redirect('/error');
//             }
//         });
//     }
// }