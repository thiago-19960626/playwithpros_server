var express = require('express');
var router = express.Router();
var models = require('../model');

router.post('/createvideo', function (req, res){
    
    if(!req.body.title || req.body.title.trim() == ''){
        res.json({err: true, msg: 'please input title'});
    }else if(!req.body.category || req.body.category == ''){
        res.json({err: true, msg: 'please input category'});
    }else if(!req.files.data){
        res.json({err: true, msg: 'please input video file'});
    }

    console.log("Video Name", req.files.data.name);
    console.log("Video MIME Type", req.files.data.mimetype);

    var filename = '/videos/' + (new Date().getTime()) + "_" + req.files.data.name;
    var file = req.files.data;
    
    file.mv('public' + filename, function(err) {
        if (err)
            res.json({err: true,msg: err});
        
        //create video on mongodb
        var video = new models.Video();
        video.title = req.body.title;
        video.type = req.files.data.mimetype;
        video.video_link = req.get('host') + filename;
        video.category = req.body.category;
        video.created_at = new Date();
        video.status = 0;
        video.save(function(err){
            if(err)
                res.json({err: true, msg: 'MongoDB Video collection creating error'});
            res.json({err: false});
        });
    });
})

module.exports = router;