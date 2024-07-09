const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.getProfile = (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, users) => {
        if (err) return res.status(500).send(err);
        if (users.length === 0) return res.status(404).send({ message: 'User not found' });

        res.send(users[0]);
    });
};

exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { username, email } = req.body;
    let avatar = null;

    if (req.file) {
        avatar = `/uploads/avatars/${req.file.filename}`;

        User.findById(userId, (err, users) => {
            if (err) return res.status(500).send(err);
            const oldAvatar = users[0].avatar;
            if (oldAvatar) {
                fs.unlink(path.join(__dirname, '..', oldAvatar), (err) => {
                    if (err) console.log(err);
                });
            }
        });
    }

    User.update(userId, { username, email, avatar }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Profile updated successfully' });
    });
};
