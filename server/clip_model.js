const mongoose = require('mongoose');

const { Schema } = mongoose;

const clipSchema = new Schema({
    youtubeId: {
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
}, {
    timestamps: { currentTime: () => new Date().toUTCString() } // all times in GMT
});

module.exports = mongoose.model("Clip", clipSchema);