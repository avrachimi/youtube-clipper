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

app.post('/create/:youtubeId', async function(req, res) {
    const youtubeId = req.params.youtubeId;
    const startTime = req.query.start;
    const duration = req.query.dur;

    const clip = await clips.create(youtubeId, startTime, duration);
    const url = 'http://' + req.get('host') + '/' + clip.id;

    res.json({ url: url });
})

app.get('/:id', async function(req, res) {
    const id = req.params.id;
    const clip = await clips.get(id);
    const youtubeId = clip.youtubeId;
    const url = 'https://youtu.be/' + youtubeId + '?t=' + 290;

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