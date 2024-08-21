import React, { useState } from 'react';
import API_URL from '../../apiConfig';

function NotePopup({ note, onClose, isViewOnly = false }) {
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
                <form onSubmit={isViewOnly ? (e) => e.preventDefault() : handleSubmit}> {/* Zapobiegamy edycji w trybie podglądu */}
                    {!isViewOnly
                        ?
                            <input
                                type="text"
                                placeholder="Tytuł"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        :
                            <h2>{title}</h2>

                    }
                    {!isViewOnly
                        ?
                            <textarea
                                placeholder="Treść"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        :
                            <p>{content}</p>
                    }
                    {!isViewOnly && ( // Pokazujemy te przyciski tylko w trybie edycji
                        <>
                            <button className="button primary" type="submit">
                                {note ? 'Zaktualizuj Notatkę' : 'Dodaj Notatkę'}
                            </button>
                            <button className="button primary" type="button" onClick={onClose}>Anuluj</button>
                        </>
                    )}
                    {isViewOnly && ( // Dodajemy przycisk zamknięcia dla trybu podglądu
                        <button className="button primary" type="button" onClick={onClose}>Zamknij</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default NotePopup;