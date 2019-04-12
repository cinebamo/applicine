var express = require('express');
var router = express.Router();
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
    url= "mongodb://localhost:27017/cinebamo";
    
 // connexion a la db cette fonction requiert 3 parametres: une url, un objet et une function de callback  
    MongoClient.connect(url,
      {useNewUrlParser:true},
      function(err, client){
        if(err) throw err;
  
        var DB = client.db('cinebamo');
  
        console.log('je suis connecté (module comments)');

/**
*@author Georges
*/
/*PUT COMMENTS - Georges */
/*Update*/

router.put('/', function(req, res, next) {
  
  var requiredProps = ['_id', 'name', 'firstname','email'];
  
  for(var i in requiredProps[i]) {
   
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  
    DB.collection('comments').updateOne({_id:ObjectId(req.body)},
    {name:req.body.name}, function(err, result){
    
    if(err) throw err;

// router.put('/', function(req, res, next) {
//   res.json('Votre commentaire a bien été mis à jour' + req.body.id);
// });


      res.json({
        result : 'ok',
        id : result.insertedId.toString()
      });

  });


});
//
/*Delete*/
router.delete('/', function (req,res,next){
    res.json('votre commenraire a bien été supprimé' + req.body.id);
});

/**
*@author ERRE
*/
/* GET Comment by Id. */
router.get('/:id', function(req, res, next) {

  DB.collection('comments').findOne({_id: ObjectId(req.params.id)},function(err, comment){
      if(err) throw err;
      res.json(comment);
    });
    // res.json('GET Comments by Id' + req.params.id);
});

/**
 * *@author ERRE
 */
/* POST  Create Comment. */
router.post('/', function(req, res, next) {

  var requiredProps = ['title', 'content', 'score', 'date'];
  // je verifie qu'il y ai bien des données reçues en post
  for(var i in requiredProps[i]) {
    // si les données reçue est indefinie répond que le champ est vide et coupe le script avec le return
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  // si les données reçues ne sont pas indefinis alors tu les insert dans la DB et tu affiche ok + toutes les données corespondant a l'id
  DB.collection('comments').insertOne(req.body, function(err, result){
    
    if(err) throw err;

        res.json({
        result : 'Commentaire inséré',
        id : result.insertedId.toString()
    
      });
console.log(res.json);
    });

  });

});

module.exports = router;