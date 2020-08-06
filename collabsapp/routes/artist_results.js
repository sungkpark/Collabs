var express = require('express');
var router = express.Router();

let artist_results = require('../controllers/artist_results');

/* GET artist result. */
router.get('/', artist_results.show_artist);
/* GET back to index page. */
router.post('/', artist_results.get_index);

module.exports = router;
