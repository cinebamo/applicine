var express = require('express');
var router = express.Router();

// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo",
  ObjectId = require('mongodb').ObjectId;// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs



  MongoClient.connect(url,
    {useNewUrlParser:true},
    function(err, client){
      if(err) throw err;

      var DB = client.db('cinebamo');

      console.log('je suis connecté (Module Movies)');

router.get('/movies/:id', function(req, res, movie) {
  DB.collection('movies').findOne({_id: ObjectId(req.params.id)},function(err, movie){
  if(err) throw err;
  // Apres obtention de l'API, changez avec id !
  res.json({result: "ok"});
  });
});


});