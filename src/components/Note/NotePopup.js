import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../apiConfig';

function NotePopup({ note, onClose }) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [status, setStatus] = useState(note?.status || 'ważne');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const noteData = { title, content, status };
        try {
            if (note) {
                await axios.put(`${API_URL}/notes/${note.id}`, noteData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                await axios.post(`${API_URL}/notes/create`, noteData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            onClose();
        } catch (error) {
            console.error('Error saving note', error);
        }
    };

    return (
        <div className="note-popup-overlay">
            <div className="note-popup-content">
                <form onSubmit={handleSubmit}>
                    <h2>{note ? 'Edit Note' : 'Add Note'}</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="ważne">Ważne</option>
                        <option value="wykonane">Wykonane</option>
                    </select>
                    <button className="button primary" type="submit">{note ? 'Update Note' : 'Add Note'}</button>
                    <button className="button primary" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default NotePopup;