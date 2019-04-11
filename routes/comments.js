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

/**
*@author Georges
*/
/*POST COMMENTS - Georges */
/*Update*/

//
router.put('/', function(req, res, next) {
  
  var requiredProps = ['_id', 'name', 'firstname','email'];
  
  for(var i in requiredProps[i]) {
   
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  
  DB.collection('comments').updateOne({_id:ObjectId(req.body)},{name:req.body.name}, function(err, result){
    
    if(err) throw err;

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
/* GET comments by Id. */
router.get('/:id', function(req, res, next) {
    res.json('GET Comments by Id' + req.params.id);
});

/* POST  Create Comment. */
router.post('/', function(req, res, next) {
    res.json('POST Comments ERRE');
});

module.exports = router;
