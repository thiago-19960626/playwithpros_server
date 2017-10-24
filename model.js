var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title: String,
    image_link: String,
    video_link: String,
    created_at : Date,
    category: String,
    type: String,
    position: Number,
    status: Number
});

module.exports.Video = mongoose.model('videos', VideoSchema);

var UserSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    uid: String,
    password: String,
    role: Number,
    status: Number, 
    created_at: Date, 
    updated_at: Date, 
    photo: String
});

module.exports.User = mongoose.model('users', UserSchema);
