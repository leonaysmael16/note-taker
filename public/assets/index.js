const notes = require("../../routes/notes");

let noteTitle;
let noteText;
let saveNoteBtn;
let noteList;



const show = (elem) => {
    elem.style.display = 'inline';
};

const hide = (elem) => {
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

const saveNotes = (note) => 
fetch('/api/notes', {
    method: 'POST',
    headers: {
        'Content': 'application/json',
    },
    body: JSON.stringify(note),
});

const deleteNote = (id) => 
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const activeNoteRender = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
        noteTitle.setAttribute('read', true);
        noteText.setAttribute('read', true);
        noteTitle.value = activeNote.title;
        noteTitle.value = activeNote.text;
    } else {
        noteTitle.removeAttribute('read');
        noteText.removeAttribute('read');
        noteTitle.value = '?';
        noteText.value = '?';
    }
};

const noteSaveHandle = () => {
    const newNote = {
        title: noteValue.value,
        text: noteText.value,
    };
    saveNotes(newNote).then(() => {
        getActiveNotes();
        activeNote();
    });
};

const deleteNoteHandle = (e) => {
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parseElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getandRenderNotes();
        activeNote();
    });
};

const noteViewHandle = (e) => {
    e.preventDefault;
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    activeNoteRender();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !note.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

const noteListRender = async (notes) => {
    let notesJSON = await notes.json();
    if (window.location)
}

