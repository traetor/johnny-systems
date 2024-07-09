const Task = require('../models/Task');

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    Task.create({ user_id: userId, title, description, status: 'to_do' }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Task created successfully' });
    });
};

exports.getTasks = (req, res) => {
    const userId = req.user.id;

    Task.findByUserId(userId, (err, tasks) => {
        if (err) return res.status(500).send(err);
        res.send(tasks);
    });
};

exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    Task.update(taskId, { title, description, status }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Task updated successfully' });
    });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;

    Task.delete(taskId, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Task deleted successfully' });
    });
};
