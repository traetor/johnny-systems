import React from 'react';

function NoteList({ notes, onEdit, onDelete }) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-item">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="note-actions">
                        <button className="button primary" onClick={() => onEdit(note)}>Edit</button>
                        <button className="button primary" onClick={() => onDelete(note.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NoteList;