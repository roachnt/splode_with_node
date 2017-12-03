var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');

// Connect to database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rooter',
    database: 'nodesplosion',
});

/* GET home page. */
router.get('/:username', function (req, res, next) {
    // Find user
    var username = req.params.username;
    var query = `SELECT * FROM user WHERE username='${username}'`;
    conn.query(query, function (err, result) {
        // If nothing is found, send 404
        if (result.length == 0) {
            res.status(404).send('User does not exist!');
        }
        // If the user is found, render their profile
        else {
            var user = result[0];
            res.render('profile', { user: user });
        }
    });
});

module.exports = router;