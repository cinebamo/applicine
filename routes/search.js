/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url = "mongodb://localhost:27017/cinebamo";

MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;

    var DB = client.db('cinebamo');

    console.log('je suis connecté (module search)');

    router.get('/', function (req, res, next) {
      //Recherche utilisant le titre, la categorie et/ou acteur
      DB.collection('category').find({}).toArray(function (err, category) {
        if (err) throw err;

        console.log(category);

        res.json(category);
      });
    });

  });

module.exports = router;