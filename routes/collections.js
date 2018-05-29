var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('collections.hbs',{title:'唱见介绍'});
});

module.exports = router;
