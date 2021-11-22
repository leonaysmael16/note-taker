const fs = require('fs');
const util = require('util');
const path = require('path');

const { v4:uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read() {
    return readFileAsync('db/ddb.json', 'utf8');
}

const getNotes = function () {
    return read().then((notes) => {
        let parsedNotes = JSON.parse(notes) || [];
        return parsedNotes
    });
}

function write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
}

function deleteNote(id) {
    return getNotes().then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => write(filteredNotes));
}

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'));
        console.log('Note here:' + JSON.stringify(data));

        res.json(data);

    });

    app.post('api/notes', (req, res) => {

        const newNote = req.body;

        newNote.id = uuidv4();

        let ddata = JSON.parse(fs.readFileSync('./db/bd.json', 'utf-8'));

        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data))

        console.log('Note Added to database');

        res.JSON(data);
    });

    app.delete('/api/notes/:id', (req, res) => {

        const noteID = req.params.id.toString();
        console.log(noteID);

        deleteNote(noteID)

        .then(() => res.json({ok: true }))
        .catch((err) => res.status(500)).json(err);


    });
}