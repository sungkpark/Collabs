var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let artist_results = require('../controllers/artist_results')

/* GET home page. */
router.get('/', index.get_index);
/* POST list of artists */
router.post('/', index.get_artists);

module.exports = router;
