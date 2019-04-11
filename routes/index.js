var express = require('express');
var router = express.Router();

// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url= "mongodb://localhost:27017/cinebamo";

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @author Mathias
 */
/* Mathias ===> cinebat.dev/home en GET */
router.get('/home', function(req, res, next) {
  res.send('ok');
});

/**
 * @author Mathias
 */
/* ===> cinebat.dev/movie/$id en GET */
router.get('/movie/:id', function(req, res, next) {
  res.send('ok ' + req.params.id);
});

/**
*@author isa 
*/
/* users  login account  >>cinebat.dev/login */
router.post('/login', function(req, res, next) {
  res.json('connexion ok'+req.body.id);
});

/* GET CGU page. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', {}); 
});

module.exports = router;
