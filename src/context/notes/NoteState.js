import { useState } from "react";
import HOST from "../../Host";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // get all Notes
    const getAllNotes = async () => {
        const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });

        const json = await response.json();
        setNotes(json);
    };

    // ADD a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${HOST}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // EDIT a Note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        // Logic to edit in CLIENT...
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tags = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    // DELETE a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;