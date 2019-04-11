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
  
  router.get('/:id', function(req, res, next) {
      console.log(req.params.id);
    res.send('salut test get category, id = ' +req.params.id);
  });
module.exports = router;