var express = require('express');
var router = express.Router();
/* GET users listing. */
// @author Maxime cinebat.dev/users/:id
router.get('/:id', function(req, res, next) {
  res.json('Votre compte est' + req.params.id); 
});

/* 
*@author isa 
*/
/* PUT users update account >>cinebat.dev/user/$id	*/
router.put('/', function(req, res, next) {
  // console.log(req.body.id);
  res.json('le compte a bien été modifié'+req.body.id);
});
// @author Maxime cinebat.dev/users
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.json('hello' + req.body.name);

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
