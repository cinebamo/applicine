/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('salut search');
  });
  


module.exports = router;