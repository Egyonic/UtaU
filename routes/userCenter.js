var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var js = 'javascripts/userCenterE.js';
var userInfo;   //用户信息
var collectInfo;    //存放收藏的歌曲信息
var recordInfor;

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
                console.log("don't have this user");
                res.render('userCenter',{title:'用户中心',js:js});
            }else {
                console.log("user is available");
                userInfo = results[0];
            }
        });
    connection.query('select * from song where sid in( select sid from collect_rcd ' +
        'where uid = (select uid from user where account=? ))',
        [acc],function ( error, results, fields) {
            if(error) throw error;
            // console.log(results);
            collectInfo = results;
            console.log('collectInfo: ');
            console.log(collectInfo);
            res.render('userCenter',{title:'用户中心',js:js,user:userInfo,collections:collectInfo});
        });


    connection.end();
});

router.post('/',function (req,res,next) {
    var acc = req.body.account;
    // console.log('查询字符中的用户');
    // console.log(acc);

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
                console.log("result is empty");
                res.send({user:{image:""}}) //返回空的user
            }else {
                res.send( {user:results[0] } );
            }

        });
    connection.end();
});

module.exports = router;
