var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rooter',
    database: 'nodesplosion',
});

/* GET home page. */
router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    var query = `SELECT * FROM user WHERE username='${username}'`;
    conn.query(query, function (err, result) {
        if (result.length == 0) {
            res.status(404).send('User does not exist!');
        }
        else {
            console.log(result);
            var user = result[0];
            res.render('profile', {username: user.username});
        }
    });
});


module.exports = router;