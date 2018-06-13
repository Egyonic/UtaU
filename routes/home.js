var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var lyrics;
var stylesheets = 'stylesheets/home.css';
router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'smgsql',
        database: 'uta'
    });
    connection.connect();
    connection.query('select * from lyrics',function (error, results, field) {
        if(error) {
            res.render('home',{title:'主页'});
            throw error;}
        // console.log(results);
        if(results.length){
            // console.log('results: ');
            // console.log(results);
            lyrics = results;
            res.render('home',{title:'主页',css:stylesheets,lyric:lyrics[0].content});
        }
    });

    // res.render('home',{title:'主页',lyric:lyrics});

    connection.end();
});

module.exports = router;
