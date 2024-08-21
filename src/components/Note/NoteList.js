import React from 'react';

function NoteList({ notes, onEdit, onDelete, onViewDetails }) { // Dodajemy onViewDetails jako prop
    return (
        <div className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-item">
                    <h3>{note.title}</h3> {/* Wyświetlamy tylko tytuł notatki */}
                    <div className="note-actions">
                        <button className="button primary" onClick={() => onViewDetails(note)}>Szczegóły</button> {/* Nowy przycisk */}
                        <button className="button primary" onClick={() => onEdit(note)}>Edytuj</button>
                        <button className="button primary" onClick={() => onDelete(note.id)}>Usuń</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NoteList;