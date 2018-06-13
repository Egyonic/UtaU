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
    connection.query('SELECT * FROM song limit 5',
        function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0){
                console.log("result is empty")
            }else {
                // console.log(results);
            }

            json = results;
            res.render('learning',{title:'学习歌曲',songs:json});
            // console.log("json: ");
            // console.log(json[0]);
        });
    connection.end();
});

router.post('/',function (req,res,next) {
    var songCount = req.body.count;
    var getCount;
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    })
    connection.connect();

    connection.query('SELECT * FROM song where sid >? limit 5',[songCount],
        function (error, results, field) {
        if(error) throw error;
        if(results.length == 0){
            console.log("length = 0");
            getCount = 0;
            res.send({newCount:getCount, songs:{}})
        }else{
            console.log("results are:");
            console.log(results);
            getCount = results.length;
            res.send({newCount:getCount, songs:results})
        }
    });

    connection.end();
});

module.exports = router;
