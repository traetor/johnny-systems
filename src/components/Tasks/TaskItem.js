import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Tasks.scss';
import API_URL from '../../apiConfig';
import texts from "../../texts";

const TaskItem = ({ task, onDelete, language, onChangeStatus }) => {
    const [showAside, setShowAside] = useState(false);
    const asideRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (asideRef.current && !asideRef.current.contains(e.target)) {
                setShowAside(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

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

    const toggleAside = () => {
        setShowAside(!showAside);
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put(
                `${API_URL}/tasks/${task.id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setShowAside(false); // Zamknij Aside po zmianie statusu
            onChangeStatus(task.id)
            // Możesz dodać dodatkową logikę po pomyślnym zaktualizowaniu statusu, np. odświeżenie listy zadań
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <button className="d-none" onClick={() => handleDelete()}>{texts[language].delete}</button>
            <div className="task-event" onClick={toggleAside}>...</div>
            {showAside && (
                <>
                    <div className="overlay" onClick={toggleAside}></div>
                    <div ref={asideRef} className="task-details">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="status-dropdown">
                            <select onChange={(e) => handleStatusChange(e.target.value)} value={task.status}>
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <button className="button primary delete-button" onClick={handleDelete}>Delete Task</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;
