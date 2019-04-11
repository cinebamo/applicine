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

    console.log('je suis connecté (module actor)');


    router.get('/:slug', function (req, res, next) {
      console.log(req.params.id);
      //recuperer toute les infos d'un acteur via son id
      DB.collection('actors').findOne({_id: ObjectId(req.params.id)},function(err, actor){
        // s'il n'y a pas d'erreur
        if(err) throw err;
  
        // renvoi ce quon a recuperer dans la db correspondant a lid 
        res.json(actor);
      });
    });

  });
module.exports = router;