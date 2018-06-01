var express = require('express');
var router = express.Router();
var mysql =require('mysql');

var json;
router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('SELECT * FROM song limit 6',
        function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0){
                console.log("result is empty")
            }else {
                console.log(results);
            }

            json = results;
            res.render('learning',{title:'学习歌曲',songs:json});
            // console.log("json: ");
            // console.log(json[0]);
        });
    connection.end();


});

module.exports = router;
