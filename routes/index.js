var express = require('express');
var router = express.Router();

var hoge = require('../lib/hoge.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var x = hoge('hoge');
  console,log(x);
  res.render('index', { title: 'Express' });
});

module.exports = router;
