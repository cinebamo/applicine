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

<<<<<<< Updated upstream
/* Mathias ===> cinebat.dev/movie/$id en GET */
router.get('/movie/:id', function(req, res, next) {
  res.send('ok ' + req.params.id);
});

=======

/* 
*@author isa 
*/
/* users  login account  >>cinebat.dev/login */
router.post('/login', function(req, res, next) {

  res.json('connexion ok'+req.body.id);
});


>>>>>>> Stashed changes
module.exports = router;
