var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('learningSecond',{title:'学习歌曲'});
});

module.exports = router;
