import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTaskForm from "./AddTasksForm";
import './Tasks.scss';
import API_URL from '../../apiConfig';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const handleAddTask = async (newTask) => {
        try {
            await axios.post(`${API_URL}/tasks`, newTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            await fetchTasks();
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            await fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    return (
        <div className="tasks-container">
            <AddTaskForm onAdd={handleAddTask} />
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
            ))}
        </div>
    );
}

export default TaskList;