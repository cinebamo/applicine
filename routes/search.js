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

router.get('/', function(req, res, next) {
    res.send('salut search');
  });
  


module.exports = router;