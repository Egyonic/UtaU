var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('userCenter',{title:'用户中心'});
});

module.exports = router;
