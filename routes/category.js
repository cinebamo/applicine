/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();

  
  router.get('/:id', function(req, res, next) {
      console.log(req.params.id);
    res.send('salut test get category, id = ' +req.params.id);
  });
module.exports = router;