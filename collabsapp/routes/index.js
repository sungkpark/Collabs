var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let artist_results = require('../controllers/artist_results');

/* GET home page. */
router.get('/', index.show_index);
/* POST list of artists */
router.post('/', index.insert_artist);

/* GET artist result. */
router.get('/artist_results', artist_results.insert_artist);
/* POST reset back to index page. */
router.post('/artist_results', artist_results.reset_artists);

// router.get('/spotify_search', spotify_search.search);

module.exports = router;
