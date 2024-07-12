import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../apiConfig';
import texts from "../../texts";

function AddTaskForm({ onAdd, language }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError(texts[language].error);
            return;
        }

        setLoading(true); // Ustawia stan ładowania na true

        try {
            const response = await axios.post(`${API_URL}/tasks`, { title, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onAdd(response.data); // Dodaj nowe zadanie do listy po udanym dodaniu
            setTitle('');
            setDescription('');
            setError(''); // Wyczyść błąd po udanym dodaniu zadania
        } catch (error) {
            console.error('Error adding task', error);
            setError(texts[language].addTaskError || 'Error adding task. Please try again later.');
        } finally {
            setLoading(false); // Resetuje stan ładowania po zakończeniu requestu
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={texts[language].taskTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading} // Blokuje pole w czasie ładowania
            />
            <textarea
                placeholder={texts[language].taskDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading} // Blokuje pole w czasie ładowania
                rows={4}
            />
            <button className="button primary" type="submit" disabled={loading}>
                {loading ? texts[language].loading : texts[language].addTask}
            </button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default AddTaskForm;
