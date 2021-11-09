const fs = require('fs');
const util = require('util');

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