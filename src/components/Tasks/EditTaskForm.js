// src/components/Tasks/EditTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../apiConfig';

function EditTaskForm({ task, onUpdate }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/tasks/${task.id}`, { title, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onUpdate(response.data); // Zaktualizuj zadanie po udanej edycji
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <form className="edit-task-form" onSubmit={handleSubmit}>
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
            <button type="submit">Update Task</button>
        </form>
    );
}

export default EditTaskForm;
