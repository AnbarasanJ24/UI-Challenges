export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input type="text" placeholder="New Note..." class="notes__title">
                <textarea class="notes__body" cols="30" rows="10" placeholder="Type for new note..."></textarea>
            </div>
        `

        const addBtn = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");


        addBtn.addEventListener('click', () => {
            this.onNoteAdd(inputTitle.value, inputBody.value);
        })

        inputTitle.addEventListener('blur', () => {
            this.onNoteEdit(inputTitle.value.trim(), inputBody.value.trim());
        })

        inputBody.addEventListener('blur', () => {
            this.onNoteEdit(inputTitle.value.trim(), inputBody.value.trim());
        })

    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_LENGTH)}
                    ${body.length > MAX_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</div>
            </div>
        `
    }

    updateSideBar(notes) {
        const container = this.root.querySelector('.notes__list');
        container.innerHTML = ``;
        console.log(container)

        for (let note of notes) {
            const eachNoteItem = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );
            container.insertAdjacentHTML("beforeend", eachNoteItem)
        }

        container.querySelectorAll('.notes__list-item').forEach(eachItem => {
            eachItem.addEventListener('click', () => this.onNoteSelect(eachItem.dataset.noteId));

            eachItem.addEventListener('dblclick', () => {
                const isConfirmed = confirm("Are you sure you want to Delete?");

                if (isConfirmed) {
                    this.onNoteDelete(+eachItem.dataset.noteId);
                }
            });
        });

    }

    updateActiveNote(note) {
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;

        this.root.querySelectorAll('.notes__list-item').forEach(eachItem => {
            eachItem.classList.remove('notes__list-item--selected');
        })

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add('notes__list-item--selected');
    }

}