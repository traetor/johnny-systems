import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from '../components/Note/NoteList';
import NotePopup from '../components/Note/NotePopup';
import texts from '../texts';
import '../components/Note/Note.scss';  // Importuj plik stylów
import API_URL from "../apiConfig";

function NoteListPage({ language }) {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes', error);
        }
    };

    const handleAddNote = () => {
        setSelectedNote(null);
        setShowPopup(true);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setShowPopup(true);
    };

    const handleClose = () => {
        fetchNotes();
        setShowPopup(false);
    }

    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`${API_URL}/notes/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNotes(notes.filter(note => note.id !== noteId));
            } catch (error) {
                console.error('Error deleting note', error);
            }
        }
    };

    return (
        <div className="intro">
            <div className="container intro-content note-list-page">
                <button className="button primary note-add" onClick={handleAddNote}>
                    {texts[language].addNote}
                </button>
                <NoteList notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
                {showPopup && <NotePopup note={selectedNote} onClose={handleClose} />}
            </div>
        </div>
    );
}

export default NoteListPage;