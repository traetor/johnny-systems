import React from 'react';
import axios from 'axios';
import './Tasks.scss';
import API_URL from '../../apiConfig';
import texts from "../../texts";

const TaskItem = ({ task, onDelete, language }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onDelete(task.id); // Odśwież listę zadań po udanym usunięciu
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <button onClick={() => handleDelete()}>{texts[language].delete}</button>
        </div>
    );
};

export default TaskItem;
