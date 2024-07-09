const db = require("../models");
const Task = db.task;

exports.createTask = (req, res) => {
    Task.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.userId
    })
        .then(task => {
            res.send(task);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllTasks = (req, res) => {
    Task.findAll({ where: { userId: req.userId } })
        .then(tasks => {
            res.send(tasks);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateTask = (req, res) => {
    Task.update(req.body, {
        where: { id: req.params.taskId, userId: req.userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Task was updated successfully." });
            } else {
                res.send({ message: `Cannot update Task with id=${req.params.taskId}. Maybe Task was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteTask = (req, res) => {
    Task.destroy({
        where: { id: req.params.taskId, userId: req.userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Task was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete Task with id=${req.params.taskId}. Maybe Task was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
