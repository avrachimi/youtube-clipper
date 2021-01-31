const mongoose = require('mongoose');

const { Schema } = mongoose;

const clipsSchema = new Schema({
    videoId: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Clip", clipsSchema);