class NotesAPI {

    static getAllNotes() {

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        return notes.sort((a, b) => a.updated > b.updated ? -1 : 1);

    }
    static saveNote(noteToBeSave) {

        const notes = this.getAllNotes();
        const isExiting = notes.find(note => note.id === noteToBeSave.id);

        if (isExiting) {
            isExiting.updated = new Date().toLocaleDateString();
            isExiting.title = noteToBeSave.title;
            isExiting.body = noteToBeSave.body;
        } else {
            noteToBeSave.id = Math.floor(Math.random() * 100000);
            noteToBeSave.updated = new Date().toLocaleString();
            notes.push(noteToBeSave);
        }

        localStorage.setItem('notes', JSON.stringify(notes))
    }
    static deleteNote(id) {

        const notes = this.getAllNotes();
        const filteredNotes = notes.filter(note => note.id !== id);

        localStorage.setItem('notes', JSON.stringify(filteredNotes));
    }

    static deleteAll() {
        localStorage.setItem('notes', JSON.stringify([]));
    }

}

export default NotesAPI;