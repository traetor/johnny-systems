import React, { useState } from 'react';
import axios from 'axios';
import './Tasks.scss';
import API_URL from '../../apiConfig';

function TaskItem({ task, onUpdate }) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [newStatus, setNewStatus] = useState(task.status);

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onUpdate(); // Odśwież listę zadań po udanym usunięciu
        } catch (error) {
            console.error('Error deleting task', error);
        }
        setShowConfirmPopup(false);
    };

    const handleStatusChange = async () => {
        try {
            await axios.put(
                `${API_URL}/tasks/${task.id}`,
                { title: task.title, status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            onUpdate(); // Odśwież listę zadań po udanym zmienieniu statusu
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
            >
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <button onClick={handleStatusChange}>Change Status</button>
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
