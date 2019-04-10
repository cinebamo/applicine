/*
*@author ERRE
*/

var express = require('express');
var router = express.Router();

/* GET comments by Id. */
router.get('/:id', function(req, res, next) {
    res.json('GET Comments by Id' + req.params.id);
});

/* POST  Create Comment. */
router.post('/', function(req, res, next) {
    res.json('POST Comments ERRE');
});
module.exports = router;
