var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Mathias ===> cinebat.dev/home en GET */
router.get('/home', function(req, res, next) {
  res.send('ok');
});

/* Mathias ===> cinebat.dev/movie/$id en GET */
router.get('/movie/:id', function(req, res, next) {
  res.send('ok ' + req.params.id);
});

module.exports = router;
