/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId;
MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;

    var DB = client.db('cinebamo');

    console.log('je suis connecté (module category)');


    router.get('/:slug', function (req, res, next) {
      console.log(req.params.slug);
      //On recupere toutes les categories, donc .find({})
      DB.collection('category').findOne({id: req.params.slug},function(err, user){
        // s'il n'y a pas d'erreur
        if(err) throw err;
  
        // renvoi ce quon a recuperer dans la db correspondant a lid 
        res.json(user);
      });
    });

    
  });
module.exports = router;