const mongoose = require('mongoose');
const Clip = require('./clip_model');

const { Schema } = mongoose;

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/clipsDB';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function get(id) {
    return Clip.findById(id).exec();
}

function getAll() {
    return Clip.find();
}

function create(videoId, start, duration) {
    var clip = new Clip({
        videoId: videoId,
        startTime: start,
        duration: duration
    });

    clip.save();

    return clip;
}

module.exports = {
    get,
    getAll,
    create
};
