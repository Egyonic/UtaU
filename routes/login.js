var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login.hbs',{title:'登陆'});
});

module.exports = router;
