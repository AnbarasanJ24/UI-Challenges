import './style.scss'
import NotesAPI from './NotesAPI';
import NotesView from './NotesView';

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this.refreshNotes();
    }

    _handlers() {
        return {
            onNoteSelect: (id) => {
                const selectedNote = this.notes.find(note => note.id === +id);
                this.view.updateActiveNote(selectedNote);
            },
            onNoteAdd: (title, body) => {
                const newNote = {
                    title: title,
                    body: body
                }
                NotesAPI.saveNote(newNote)
                this.refreshNotes();
            },
            onNoteEdit: (title, body) => {
                const existingNote = {
                    id: this.activeNote.id,
                    title,
                    body
                }
                NotesAPI.saveNote(existingNote)
                this.refreshNotes();
            },
            onNoteDelete: (id) => {
                NotesAPI.deleteNote(id);
                this.refreshNotes();
            }
        }
    }

    refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        console.log("Notes", notes)
        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateSideBar(this.notes);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }


}

const app = document.querySelector('#root');
const initializeApp = new App(app);
