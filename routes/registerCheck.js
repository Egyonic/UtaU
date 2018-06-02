var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//to check  if the account is available
router.post('/check', function(req, res, next) {
    var acc = req.body.account;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('select account from user where account = ?',[acc],
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

//to register new account
router.post('/register', function(req, res, next) {
    var acc = req.body.acc;
    var psd = req.body.password;
    var eml = req.body.email;
    // console.log(acc);
    // console.log(psd);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('select account from user where account = ?',[acc],
        function (error, results, field) {
            if (error) throw error;
            if(results.length == 0){
                connection.query('insert into user SET ?',
                    {uid:null ,account:acc, password:psd},
                    function () {
                    res.send(true);
                });

                if (eml){
                    connection.query('update user_info set email =? ' +
                        'where uid = (select uid from user where account = ?)',
                        [eml,acc],function (error, results, field) {
                        if(error) throw  error;
                    });
                }
            }else {
                res.send(false);
            }
        });

});

module.exports = router;
