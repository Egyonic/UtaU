var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var css = 'stylesheets/learnSecond.css';
var js ='javascripts/learnSecondEvent.js';

router.get('/', function(req, res, next) {
    var lyricPath;
    var lyric;
    sid = req.query.sid;
    console.log(sid);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });

    //查询歌词
    connection.query('select * from lyrics where sid = ?',[sid],function ( error, results, fields) {
        if( error) throw error;
        // console.log(results);
        lyricPath = results[0].content;
        console.log(lyricPath);

        fs.readFile(lyricPath,'utf-8',function (error, data) {
            if( error){
                console.log(error);
            }else {
                // console.log(data);
                lyric = data;

                //查询剩余信息并render
                connection.query('select * from song where sid = ?',[sid],
                    function (error, results, fields) {
                        if( error) throw error;
                        console.log(results);
                        // console.log(lyric);
                        res.render('learningSecond',{
                            title:'学习歌曲',
                            css:css,
                            js:js,
                            song:results[0],
                            lyric:lyric
                        });
                    });
            }
        });

    });



});

module.exports = router;
