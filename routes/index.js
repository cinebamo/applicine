var express = require('express');
var router = express.Router();

// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url= "mongodb://localhost:27017/cinebamo";

  MongoClient.connect(url,
    {useNewUrlParser:true},
    function(err, client){
      if(err) throw err;

      var DB = client.db('cinebamo');

      console.log('je suis connecté');
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

  var requiredProps = ['email','password'];
  for(var i in requiredProps[i]) {
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  DB.collection('users').insertOne(req.body, function(err, result){
    
    if(err) throw err;

      res.json({
        result : 'ok',
        id : result.insertedId.toString()
      });

  });


});


/* GET CGU page. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', {}); 
});
});
module.exports = router;
