import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTaskForm from "./AddTasksForm";
import './Tasks.scss';
import API_URL from '../../apiConfig';
import texts from "../../texts";

const TaskList = ({ language }) => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [statusFilter]);

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
        await fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await fetchTasks();
    };

    const handleTaskUpdate = async (taskId, newStatus) => {
        try {
            await axios.put(
                `${API_URL}/tasks/${taskId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            await fetchTasks(); // Odśwież listę po pomyślnym zaktualizowaniu zadania
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    const onDragStart = (e, id) => {
        e.dataTransfer.setData("taskId", id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, status) => {
        const taskId = e.dataTransfer.getData("taskId");
        handleTaskUpdate(taskId, status);
    };

    return (
        <div className="intro">
            <div className="container intro-content tasks-container">
                <AddTaskForm onAdd={handleAddTask} language={language} />
                <div className="task-columns">
                    <div
                        className="task-column"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, 'to_do')}
                    >
                        <h3>{texts[language].tasksTodo}</h3>
                        {tasks
                            .filter(task => task.status === 'to_do')
                            .map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task.id)}
                                >
                                    <TaskItem language={language} task={task} onDelete={handleDeleteTask} onChangeStatus={handleAddTask} />
                                </div>
                            ))}
                    </div>
                    <div
                        className="task-column"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, 'in_progress')}
                    >
                        <h3>{texts[language].tasksInProgress}</h3>
                        {tasks
                            .filter(task => task.status === 'in_progress')
                            .map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task.id)}
                                >
                                    <TaskItem language={language} task={task} onDelete={handleDeleteTask} onChangeStatus={handleAddTask} />
                                </div>
                            ))}
                    </div>
                    <div
                        className="task-column"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, 'done')}
                    >
                        <h3>{texts[language].tasksDone}</h3>
                        {tasks
                            .filter(task => task.status === 'done')
                            .map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, task.id)}
                                >
                                    <TaskItem language={language} task={task} onDelete={handleDeleteTask} onChangeStatus={handleAddTask} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
