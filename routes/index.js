var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(sess);
  res.render('index');
});

module.exports = router;
