const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');

exports.getUserProfile = (req, res) => {
    User.findByPk(req.userId)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateUserProfile = (req, res) => {
    User.update(req.body, {
        where: { id: req.userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "User profile was updated successfully." });
            } else {
                res.send({ message: `Cannot update User profile with id=${req.userId}. Maybe User profile was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.uploadAvatar = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        User.update({ avatar: req.file.path }, {
            where: { id: req.userId }
        })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "Avatar was updated successfully." });
                } else {
                    res.send({ message: `Cannot update Avatar with id=${req.userId}. Maybe Avatar was not found or req.body is empty!` });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    });
};
