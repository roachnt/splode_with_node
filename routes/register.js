var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
    console.log(req.body.username, req.body.email);
    var query = `Insert into user (username,email) VALUES ('${req.body.username}', '${req.body.email}')`;
    conn.query(query, function (err, result) {
        if (err) {
            console.log('Could not create user!');
            res.render('register');
        }
        else {
            res.render('usercreated');
        }
    });
});

module.exports = router;