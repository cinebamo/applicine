/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url= "mongodb://localhost:27017/cinebamo";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:slug', function(req, res, next) {
    console.log(req.params.id);
  res.send('salut get actor, slug = ' +req.params.slug);
});
module.exports = router;