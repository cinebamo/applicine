var express = require('express');
var router = express.Router();
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url= "mongodb://localhost:27017/cinebamo";

  // connexion a la db cette fonction requiert 3 parametres: une url, un objet et une function de callback
  MongoClient.connect(url,
    {useNewUrlParser:true},
    function(err, client){
      if(err) throw err;

      var DB = client.db('cinebamo');

      console.log('je suis connecté');
  
/**
*@author isa 
*/
/* GET users listing. exemple pour obtenir tous les users*/
  router.get('/', function(req, res, next) {

    DB.collection('users').find({}).toArray(function(err, users){
        if(err) throw err;
    
          console.log(users);
    
          res.json(users);
        });
     
    });


/* GET users listing. */
/**
*@author Maxime
*/
// @author Maxime cinebat.dev/users/:id
router.get('/:id', function(req, res, next) {
    // recupere lutilisateur dont lid est passe en parametre dans la db
    DB.collection('users').findOne({_id: ObjectId(req.params.id)},function(err, user){
      // s'il n'y a pas d'erreur
      if(err) throw err;

      // renvoi ce quon a recuperer dans la db correspondant a lid 
      res.json(user);
    });

});

/**
*@author isa 
*/
/* PUT users UPDATE account >>cinebat.dev/user/$id	*/
  router.put('/', function(req, res, next) {
    
    var requiredProps = ['name','firstname', 'email', 'password','age'];
    // je verifie qu'il y ai bien des données reçues en post
    for(var i in requiredProps[i]) {
      // si les données reçues sont indefinies répond que le champ est vide et coupe le script avec le return
      if(typeof req.body[requiredProps[i]] == 'undefined'){
        return res.send(requiredProps[i] + 'empty');
      }
    }
    // si les données reçues ne sont pas indefinis alors tu les update dans la DB et tu affiche ok + toutes les données corespondant a l'id
    DB.collection('users').updateOne({_id: ObjectId(req.body.id)},
                                      {name:req.body.name},
                                      {firstname: req.body.firstname},
                                      {email: req.body.email},
                                      {password: req.body.password},
                                      {age: req.body.age}, function(err, result){
    
      if(err) throw err;
        res.json({
        result : 'Votre compte à bien été modifié',
        id : result.upsertedId.toString()
        });
        console.log(result.upsertedId.toString());
    });
});
/**
*@author Maxime
*/
// @author Maxime cinebat.dev/users
router.post('/', function(req, res, next) {
  
  var requiredProps = ['name', 'email', 'password'];
  // je verifie qu'il y ai bien des données reçues en post
  for(var i in requiredProps[i]) {
    // si les données reçue est indefinie répond que le champ est vide et coupe le script avec le return
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  // si les données reçues ne sont pas indefinis alors tu les insert dans la DB et tu affiche ok + toutes les données corespondant a l'id
  DB.collection('users').insertOne(req.body, function(err, result){
    
    if(err) throw err;

      res.json({
        result : 'ok',
        id : result.insertedId.toString()
      });

  });


});

/**
*@author isa 
*/
/* DELETE users delete account  >>cinebat.dev/user/$id */
router.delete('/id', function(req, res, next) {
  // console.log(req.body.id);
  res.json('le compte a bien été supprimé'+req.body.id);
});

});
module.exports = router;
