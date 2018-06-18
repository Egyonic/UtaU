var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var lyrics;
var songs;
var works;

var stylesheets = 'stylesheets/home.css';

router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'smgsql',
        database: 'uta'
    });
    connection.connect();
    connection.query('select * from song limit 3',[],function (error, results, fields) {
        if( error) throw error;
        // console.log(results);
        songs = results;
    });

    connection.query('select name,description,image from work limit 3', [],
        function (error, results, fields) {
            if(error) throw error;
            works = results;
    });
    connection.query('select time from upload limit 3', [],
        function (error, results, fields) {
            if(error) throw error;
            console.log(results);
            for(var i=0;i<results.length; i++){
                works[i].time = results[i].time.getFullYear();
                works[i].time += '-'+results[i].time.getMonth();
                works[i].time += '-'+results[i].time.getDate();
            }
        });
    connection.query('select name from user_info limit 3', [],
        function (error, results, fields) {
            if(error) throw error;
            for(var i=0;i<results.length; i++){
                works[i].user = results[i].name;
            }
        });


    connection.query('select * from lyrics',function (error, results, field) {
        if(error) {
            res.render('home',{title:'主页'});
            throw error;}
        // console.log(results);
        if(results.length){
            // console.log('results: ');
            // console.log(results);
            lyrics = results;
            // console.log(songs);
            // console.log('second query statement');
            res.render('home',{
                title:'主页',
                css:stylesheets,
                lyric:lyrics[0].content,
                songs:songs,
                works:works
            });
        }
    });


    connection.end();
});

module.exports = router;
