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
    
    connection.query('select * from singer',function (error,results, field) {
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

module.exports = router;
