const express = require('express');
var mongoose = require('mongoose');

const { Schema } = mongoose;
const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/clipsDB';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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

const Clip = mongoose.model("Clip", clipsSchema);

/*
const clip = new Clip({
    videoId: 'bVKHRtafgPc',
    startTime: 200,
    duration: 20
});

clip.save();
*/

// Youtube URL with starting time marker
// https://youtu.be/[id]?t=291

app.get('/', function (req, res) {
    res.send('index page');
})

app.get('/create/:id', function(req, res) {
    const id = req.params.id;
    const startTime = req.query.start;
    const duration = req.query.dur;

    res.send({
        message: 'Youtube Video ID is: ' + id,
        youtubeLink: 'https://youtu.be/' + id,
        startTime: startTime,
        duration: duration
    });
})

app.get('/:id', async function(req, res) {
    const id = req.params.id;
    const clip = await Clip.findById(id).exec();
    const youtubeId = clip.videoId;
    const url = 'https://youtu.be/' + youtubeId + '?t=' + 290;

    res.send({
        message: 'Database Entry ID is: ' + id,
        youtubeURL: url
    });
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started running at http://localhost:${port}`)
})