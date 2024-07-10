import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTaskForm from "./AddTasksForm";
import './Tasks.scss';
import API_URL from '../../apiConfig';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState(''); // Stan do przechowywania wybranego statusu

    useEffect(() => {
        fetchTasks();
    }, [statusFilter]); // Dodanie statusFilter do zależności useEffect, aby odświeżać listę zadań po zmianie statusu

    const fetchTasks = async () => {
        try {
            let url = `${API_URL}/tasks`;
            if (statusFilter) {
                url += `?status=${statusFilter}`;
            }
            const response = await axios.get(url, {
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
            <div className="task-filters">
                <button onClick={() => setStatusFilter('')}>All Tasks</button>
                <button onClick={() => setStatusFilter('to_do')}>To Do</button>
                <button onClick={() => setStatusFilter('in_progress')}>In Progress</button>
                <button onClick={() => setStatusFilter('done')}>Done</button>
            </div>
            <AddTaskForm onAdd={handleAddTask} />
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
            ))}
        </div>
    );
}

export default TaskList;
