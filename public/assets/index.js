let noteTitle;
let noteText;
let saveNoteBtn;
let noteList;



const show = (elem) => {
    elem.style.display = 'inline';
};

const hidde = (elem) => {
    elem.style.display = 'none;'
};

let activeNotes = {};

const getNotes = () => 
    fetch('/api/notes', {
        method: 'GET',
        headders: {
            'Content-Type': 'application/json',
        },
    });