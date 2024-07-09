import React from 'react';
import './Tasks.scss';

function TaskItem({ task }) {
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}

export default TaskItem;
