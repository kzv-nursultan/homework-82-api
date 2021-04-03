const express = require('express');
const cors = require('cors');
const artist = require('./app/artist')
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/artist', artist);

app.listen(port, ()=>{
    console.log('server started on ${port} port');
});