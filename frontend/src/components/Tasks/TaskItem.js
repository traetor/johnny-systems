// src/components/Tasks/TaskItem.js
import React from 'react';
import axios from 'axios';
import './Tasks.scss';
import API_URL from '../../apiConfig';

function TaskItem({ task, onDelete }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onDelete(task.id); // Usuń zadanie z listy po udanym usunięciu
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TaskItem;
