var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home.hbs',{title:'主页'});
});

module.exports = router;
