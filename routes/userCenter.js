var express = require('express');
// var session = require('express-session');
var mysql = require('mysql');
var router = express.Router();
// var app = express();
var json;

router.get('/', function(req, res, next) {

    var acc = req.query.account;
    console.log('查询字符中的用户');
    console.log(acc);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    connection.query('SELECT * FROM user_info where uid= (select uid from user where account=?)',
        [acc],
        function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0){
                console.log("result is empty")
            }else {
                // console.log(results);
            }
            json = results;
            res.render('userCenter',{title:'用户中心',user:json[0]});

        });
    connection.end();
});

// router.post('/',function (req,res,next) {
//     // var acc = req.body.user;
//     req.session.user ='five';
//     console.log(req.session.user);
//     res.send(req.session.user);
//     res.end();
// });

module.exports = router;
