var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var js = 'javascripts/userCenterE.js';
var css= 'stylesheets/user.css';
var userInfo;   //用户信息
var collectInfo;    //存放收藏的歌曲信息
var recordInfo = [{},{},{},{},{},{},{},{},{},{}];    //学习记录信息
var songs;
var times;

router.get('/', function(req, res, next) {

    var acc = req.query.account;
    console.log('查询字符中的用户');
    console.log(acc);

    // getLearnRecord(acc);

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

    //查询时间并给学习记录对象赋值
    connection.query('select time from learn_rcd where uid = (select uid from user where account=? ) ',
        [acc],
        function (error, results, fields) {
            if(error){
                console.log(error);
                throw error;
            }

            if( results.length){
                // console.log('查询学习记录成功！');
                console.log(results);
                times = results;
                for(var i=0; i<results.length; i++){
                    recordInfo[i].time = results[i].time.getFullYear();
                    recordInfo[i].time += '-'+results[i].time.getMonth();
                    recordInfo[i].time += '-'+results[i].time.getDate();
                }
            }else {
                console.log('查询学习记录出错');
            }
        });
    // console.log(times);

    //查询学习记录中歌曲的信息，并赋值给recordInfo数组对象
    connection.query('select name,sid,singer,image from song where sid in( select sid from learn_rcd ' +
        'where uid = (select uid from user where account=? ))',
        [acc],
        function (error, results, fields) {
            if(error) throw error;
            // console.log("before songs log");
            // console.log(results);
            songs = results;
            // console.log(songs);
            for(var i=0; i<songs.length; i++){
                recordInfo[i].name = results[i].name;
                recordInfo[i].sid = results[i].sid;
                recordInfo[i].singer = results[i].singer;
                recordInfo[i].image = results[i].image;
            }
        });

    connection.query('select sid,name,singer,image from song where sid in( select sid from collect_rcd ' +
        'where uid = (select uid from user where account=? ))',
        [acc],function ( error, results, fields) {
            if(error) throw error;
            // console.log(results);
            collectInfo = results;
            // console.log('collectInfo: ');
            // console.log(collectInfo);
            // console.log('recordInfo:');
            // console.log(recordInfo);
            // console.log(css);
            res.render('userCenter',{
                title:'用户中心',
                js:js,
                css:css,
                user:userInfo,
                collections:collectInfo,
                record:recordInfo,
            });
        });

    connection.end();
});

router.post('/',function (req,res,next) {
    var acc = req.body.account;
    console.log(req.body.action);
    // console.log('查询字符中的用户');
    // console.log(acc);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'smgsql',
        database : 'uta'
    });
    connection.connect();
    if(req.body.action == "query"){
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
    }
    else if(req.body.action == "change"){
        var uid;
        // console.log(req.body.sex);
        var name = req.body.name;
        var sex = req.body.sex;
        var email = req.body.email;
        var desc = req.body.desc;
        var account = req.body.account;
        // console.log(account);
        // console.log(uid);
        
        connection.query('SELECT uid FROM user WHERE account = ?',[account],
            function ( error, results, fields) {
                if( error) throw error;
                // console.log("result:");
                // console.log(results);
                uid = results[0].uid;
                // console.log(uid);

                connection.query('UPDATE user_info SET name=?, sex=?, description=?, email=? where uid = ?',
                    [name,sex,desc,email, uid],function ( error,results, fields) {
                        if(error) throw error;
                        console.log(uid);
                        res.send(true);
                        connection.end();
                    });
        });


    }

});

module.exports = router;
