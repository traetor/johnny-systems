// src/components/Tasks/AddTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../apiConfig';

function AddTaskForm({ onAdd }) {
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
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTaskForm;
