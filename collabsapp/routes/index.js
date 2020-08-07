var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let artist_results = require('../controllers/artist_results');

/* GET home page. */
router.get('/', index.get_index);
/* POST list of artists */
router.post('/', index.get_artists);

/* GET artist result. */
router.get('/artist_results', artist_results.show_artist);
/* GET back to index page. */
router.post('/artist_results', artist_results.get_index);

module.exports = router;
