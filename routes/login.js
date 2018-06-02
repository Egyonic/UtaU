var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    res.render('login.hbs',{title:'登陆'});
});

router.post('/',function (req,res, next) {
    console.log(req.body.acc);
    console.log(req.body.password);
    var account = req.body.acc;
    var psd = req.body.password;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('select account from user where account=? AND password=?',[account,psd],
        function (error, results, field) {
            if (error) throw error;
            if(results.length == 0){
                res.send(false);
            }else {
                res.send(true);
            }
        });
});

module.exports = router;
