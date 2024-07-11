// src/components/Tasks/AddTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../apiConfig';
import texts from "../../texts";

function AddTaskForm({ onAdd, language }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/tasks`, { title, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onAdd(response.data); // Dodaj nowe zadanie do listy po udanym dodaniu
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={texts[language].taskTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder={texts[language].taskDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button className="button primary" type="submit">{texts[language].addTask}</button>
        </form>
    );
}

export default AddTaskForm;
