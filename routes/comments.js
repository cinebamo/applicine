var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* 
*POST COMMENTS - Georges 
*/

/*Update*/
router.put('/', function(req, res, next) {
  res.json('Votre commentaire a bien été mis à jour' +req.body.id);
});

/*Delete*/
router.delete('/', function (req,res,next){
    res.json('votre commenraire a bien été supprimé' +req.body.id)
});



module.exports = router;
