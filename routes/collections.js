var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var js ='javascripts/collectionEvent.js';
var css ='stylesheets/collection.css';

router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    
    connection.query('select * from singer limit 3',function (error,results, field) {
        if (error) throw error;
        if(results.length == 0){
            res.send(false);
        }else {
            console.log(results);
            res.render('collections.hbs',{title:'唱见介绍', singers:results,js:js,css:css});
        }
    });

    connection.end();
});

router.post('/',function (req,res,next) {
    var singerCount = req.body.count;
    var getCount;
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();

    //翻页处理
    if(singerCount){
        connection.query('SELECT * FROM singer where sgid >? limit 3',[singerCount],
            function (error, results, field) {
                if(error) throw error;
                if(results.length == 0){
                    console.log("length = 0");
                    getCount = 0;
                    res.send({newCount:getCount, singers:{} })
                }else{
                    console.log("results are:");
                    console.log(results);
                    getCount = results.length;
                    res.send({newCount:getCount, singers:results})
                }
            });
    }
    //搜索处理
    else {
        var target = req.body.singerName;
        var que = "select * from singer where name LIKE '%"+target+"%' OR nickname LIKE '%"+target+"%' ";
        connection.query( que, [], function ( error, results, fields) {
            if( error) throw error;
            console.log(results);
            res.send( {singers:results});
        });
    }


    connection.end();
});

module.exports = router;
