﻿var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res) {
    res.render('login', {layout: false});
});


router.get('/profile', function(req, res){
    res.render('profile', { title: 'Dashboard | Profile' });
});

module.exports = router;