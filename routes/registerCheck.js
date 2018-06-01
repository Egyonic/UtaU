var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next) {
    console.log("get post request");
    var queryStr = req.body.account;
    var data = "my data";

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('select account from user where account = ?',[queryStr],
        function (error, results, field) {
            if (error) throw error;
            if(results.length == 0){
                res.send('可用');
            }else {
                console.log(results);
                res.send('不可用');
            }
    });

});

module.exports = router;
