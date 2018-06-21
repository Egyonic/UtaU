var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var css = 'stylesheets/learnSecond.css';
var js ='javascripts/learnSecondEvent.js';
var sid;

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

router.post('/', function(req, res, next){
    var account = req.body.account;
    var uid;
    console.log(account);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    
    connection.query('select uid from user where account = ?',[account],
        function ( error, results, fields) {
            if(error) throw error;

            uid = results[0].uid;
            console.log(uid);

            connection.query('select time from learn_rcd where uid=? and sid=?', [uid, account],
                function (error, results, fields) {
                    if( error) throw error;

                    //有记录，则跟新
                    var date = new Date();
                    var time = date;
                    console.log(time);

                    if(results.length>0){
                        console.log('update');
                        connection.query('UPDATE learn_rcd SET time = ? where uid=? AND sid=?',
                            [time, uid, account],function ( error, results, fields) {
                                res.send(true);
                            });
                    }
                    //无记录，则插入
                    else{
                        console.log('insert');
                        connection.query('INSERT INTO learn_rcd values(?,?,?)',
                            [uid, sid, time],function ( error, results, fields) {
                                res.send(true);
                            });
                    }
                })
    });

});

module.exports = router;
