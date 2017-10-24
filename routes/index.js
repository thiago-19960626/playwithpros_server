var express = require('express');
var router = express.Router();
var models = require('../model');
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res) {
    //get videos
    models.Video.find({},function(err, videos){
        if(err){
            throw err;
        }
        console.log("Getting Videos",videos);
        res.render('index', {title: 'Dashboard | Videos', videos: videos, moment: moment});
    });
});

router.get('/edit/:id', function(req,res){
    var id = req.params.id;
    models.Video.findById(id, function(err, video){
        if(err)
            throw err;
        console.log("Single Video Info", video);
        res.render('single', {id: req.params.id, video: video, moment: moment, title: 'Dashboard | Video Detail'});
    });    
});

router.post('/save/:id', function(req, res){
    var id = req.params.id;
    var action = req.body.action;
    var category = req.body.category;
    var position = req.body.position;

    models.Video.findById(id, function(err, video){
        video.category = category;
        video.position = position;
        if(action == 'approve'){
            video.status = 1;
        }else{
            video.status = 2;
        }
        video.save(function(err){
            if(err){
                res.json({err: true, msg: err});
            }
            res.json({err: false});
        });
    });
});

module.exports = router;