const express = require('express');

const app = express();

app.set('views', './views')
app.set('view engine', 'pug')

// Youtube URL with starting time marker
// https://youtu.be/[id]?t=291

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/clip/:id', function(req, res) {
    const id = req.params.id;

    res.send('Video ID is: ' + id);
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started running at http://localhost:${port}`)
})