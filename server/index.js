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

// https://youtu.be/[id]?t=[startTime]

app.post('/create', async function(req, res) {
    const youtubeId = req.body.youtubeId;
    const startTime = req.body.startTime;
    const duration = req.body.duration;

    const clip = await clips.create(youtubeId, startTime, duration);
    const url = 'http://' + req.get('host') + '/' + clip.id;

    res.json(clip);
})

app.get('/clip/:id', async function(req, res) {
    const id = req.params.id;
    const clip = await clips.get(id);
    const url = 'https://youtu.be/' + clip.youtubeId + '?t=' + clip.startTime;

    res.json({
        youtubeURL: url,
        duration: clip.duration
    });
})

app.get('/view/clips', async function(req, res) {
    const body = req.body;
    const allClips = await clips.getAll();
    res.json(allClips);
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started running at http://localhost:${port}`)
})