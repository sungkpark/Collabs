exports.show_artist = function (req, res, next) {
    var searched_name = req.query.searched_name[0].toUpperCase() + req.query.searched_name.substring(1);
    var artist_results = req.query.artists;
    res.render('artist_results',
        {
            title: 'Collabs',
            searched_name: searched_name,
            artists: artist_results
        });
}

exports.get_index = function (req, res, next) {
    res.redirect('/');
}