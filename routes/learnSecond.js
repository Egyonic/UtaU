var express = require('express');
var router = express.Router();
var css = 'stylesheets/learnSecond.css';

router.get('/', function(req, res, next) {
    res.render('learningSecond',{title:'学习歌曲',css:css});
});

module.exports = router;
