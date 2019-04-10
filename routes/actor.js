/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:slug', function(req, res, next) {
    console.log(req.params.id);
  res.send('salut get actor, slug = ' +req.params.slug);
});
module.exports = router;