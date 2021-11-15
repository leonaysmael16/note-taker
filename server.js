const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3306;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/notes');

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

    app.get('*', (req, res) => 
    res.sendFile(path.join)
    )

    // commit test