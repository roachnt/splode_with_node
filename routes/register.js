var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

router.use(session({secret: 'ssshhhhh'}));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rooter',
    database: 'nodesplosion',
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/createuser', function (req, res, next) {
    var query = `INSERT INTO user VALUES ('${req.body.username}','${req.body.email}',MD5('${req.body.password}') )`;
    conn.query(query, function (err, result) {
        if (err) {
            console.log('Could not create user!');
            console.log(err);
            res.render('register');
        }
        else {
            
            sess = req.session;
            sess.email = req.body.email; // equivalent to $_SESSION['email'] in PHP.
            sess.username = req.body.username;
            res.redirect('/');
        }
    });
});

module.exports = router;