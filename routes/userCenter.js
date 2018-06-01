var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var json;

router.get('/', function(req, res, next) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('SELECT * FROM user_info where uid=1',
        function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0){
                console.log("result is empty")
            }else {
                console.log(results);
            }

            json = results;
            res.render('userCenter',{title:'用户中心',user:json[0]});

        });
    connection.end();
});


module.exports = router;
