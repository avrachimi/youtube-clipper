const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const clips = require('./clips');
const Clip = require('./clip_model');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Youtube URL with starting time marker
// https://youtu.be/[id]?t=291

app.get('/create/:videoId', function(req, res) {
    const videoId = req.params.id;
    const startTime = req.query.start;
    const duration = req.query.dur;

    //const clip = await clips.create(videoId, startTime, duration);
    var clip = new Clip({
        videoId: videoId,
        startTime: startTime,
        duration: duration
    });

    clip.save();

    res.json(clip);
})

app.get('/:id', async function(req, res) {
    const id = req.params.id;
    const clip = await Clip.findById(id).exec(); //clips.get(id);
    const youtubeId = clip.videoId;
    const url = 'https://youtu.be/' + youtubeId + '?t=' + 290;

    res.json({
        message: 'Database Entry ID is: ' + id,
        youtubeURL: url
    });
})

app.get('/clips', async function(req, res) {
    res.json(Clip.find());//clips.getAll());
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started running at http://localhost:${port}`)
})