var express = require('express');
var router = express.Router();
var mysql =require('mysql');

var js = 'javascripts/learning.js';
var css = 'stylesheets/learning.css';

var json;
router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();

    connection.query('SELECT * FROM song limit 5',
        function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0){
                console.log("result is empty")
            }else {
                // console.log(results);
            }

            json = results;
            res.render('learning',{title:'学习歌曲',songs:json,js:js,css:css});
            // console.log("json: ");
            // console.log(json[0]);
        });
    connection.end();
});

router.post('/',function (req,res,next) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    })
    connection.connect();

    // console.log(req.body.search);
    // console.log(req.body.count);

    //上下页的处理
    if(req.body.count){
        var songCount = req.body.count;
        var getCount;   //传递新的歌曲总数

        connection.query('SELECT * FROM song where sid >? limit 5',[songCount],
            function (error, results, field) {
                if(error) throw error;
                if(results.length == 0){
                    console.log("length = 0");
                    getCount = 0;
                    res.send({newCount:getCount, songs:{}})
                }else{
                    // console.log("results are:");
                    // console.log(results);
                    getCount = results.length;
                    res.send( {newCount:getCount, songs:results})
                }
            });
    }
    //搜索的处理
    else {
        var target = req.body.songname;
        var que = "select * from song where name LIKE '%"+target+"%' ";
        console.log(target);

        connection.query(que, function (error, results, fields) {
                if(error) throw error;

                // console.log(results);
                res.send( {songs:results});
            })
    }

    connection.end();
});

module.exports = router;
