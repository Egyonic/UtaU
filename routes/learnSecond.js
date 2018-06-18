var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var css = 'stylesheets/learnSecond.css';

router.get('/', function(req, res, next) {
    sid = req.query.sid;
    console.log(sid);
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });

    connection.query('select * from song where sid = ?',[sid],
        function (error, results, fields) {
            if( error) throw error;
            console.log(results);
            res.render('learningSecond',{
                title:'学习歌曲',
                css:css,
                song:results[0]
            });
    });

});

module.exports = router;
