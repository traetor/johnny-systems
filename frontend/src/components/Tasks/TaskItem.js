import React, { useState } from 'react';
import axios from 'axios';
import './Tasks.scss';
import API_URL from '../../apiConfig';

function TaskItem({ task, onDelete }) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

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
        setShowConfirmPopup(false);
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => setShowConfirmPopup(true)}>Delete</button>

            {showConfirmPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Are you sure you want to delete this task?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={() => setShowConfirmPopup(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
