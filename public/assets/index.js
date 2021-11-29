const notes = require("./routes/notes.js");

let noteTitle;
let noteText;
let saveNoteBtn;
let noteList;
let newNoteBtn;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');
  }

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
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems =[];

    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-item-title');
        SVGTSpanElement.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );
            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }
        return liEl;
    };

    if (notesJSON.length === 0) {
        noteListItems.push(createLi('No saved notes', false));
    }

    notesJSON.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListItems.push(li);
    });
     if (window.location.pathname === '/notes') {
         noteListItems.forEach((note) => noteList[0].append(note));
     }
};

const getandRenderNotes = () => getNotes().then(noteListRender);

if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', noteSaveHandle);
    newNoteBtn.addEventListener('click', noteViewHandle);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getandRenderNotes();