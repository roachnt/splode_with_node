var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rooter',
  database: 'nodesplosion',
});

conn.connect(function (err) {
  if (err) throw err;
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {failedLogin: false});
});

router.post('/authenticate', function (req, res, next) {
  var query = `SELECT password FROM user WHERE username='${req.body.username}'`;
  conn.query(query, function (err, result) {
    if (err) {
      console.log('Could not login user!');
      console.log(err);
      res.render('login', {failedLogin: false});
    }
    else if (result.length == 0) {
      res.render('login', {failedLogin: false});
    }
    else {
      var realPassword = result[0].password;
      var enteredPassword = md5(req.body.password);

      if (realPassword == enteredPassword) {
        sess = req.session;
        sess.email = req.body.email; // equivalent to $_SESSION['email'] in PHP.
        sess.username = req.body.username;
        res.redirect('/');
      }
      else res.render('login', {failedLogin: true});
    }
  });
});

module.exports = router;