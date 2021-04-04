const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const exitHook = require('async-exit-hook');
const artist = require('./app/artist');
const albums = require('./app/albums');
const track = require('./app/track');
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

app.use('/artist', artist);
app.use('/albums', albums);
app.use('/tracks', track);

const run = async () => {
    await mongoose.connect('mongodb://localhost/musicapi',
        { useNewUrlParser: true, useUnifiedTopology: true});

    app.listen(port, ()=>{
        console.log('server started on port ' + port);
    });

    exitHook(async callback => {
        await mongoose.disconnect();
        console.log(' mongoose was disconnected');
        callback();
    });
};

run().catch(e=>console.error(e));