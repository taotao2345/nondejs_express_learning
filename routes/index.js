'use strict';

var express = require('express');
var router = express.Router();

var hoge = require('../lib/hoge.js');

router.get("/", function(req, res) {
  var x = hoge('hoge');
  x = hoge + 'hoge';
  res.send({
    hoge: 'hoge'
  });
});

module.exports = router;
