var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 
*@author isa 
*/
/* POST users create account >>cinebat.dev/user*/
router.post('/', function(req, res, next) {
  res.send('le compte a bien été crée');
});

/* 
*@author isa 
*/
/* PUT users update account >>cinebat.dev/user/$id	*/
router.put('/', function(req, res, next) {
  // console.log(req.body.id);
  res.json('le compte a bien été modifié'+req.body.id);
});

/* 
*@author isa 
*/
/* DELETE users delete account  >>cinebat.dev/user/$id */
router.delete('/', function(req, res, next) {
  // console.log(req.body.id);
  res.json('le compte a bien été supprimé'+req.body.id);
});

module.exports = router;
