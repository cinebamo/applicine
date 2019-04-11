
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
*@author Georges
*/
/*POST COMMENTS - Georges */
/*Update*/
router.put('/', function(req, res, next) {
  res.json('Votre commentaire a bien été mis à jour' + req.body.id);
});

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
