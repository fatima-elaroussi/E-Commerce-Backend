const user = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const usersget = (req, res) => {
    user.find()
        .sort({ username: 1 })
        .exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).json({ error: 'Error retrieving users' });
        });
};

const usersgetbyid = (req, res) => {
    user.findOne({ _id: req.params.id })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.error('Error retrieving user by ID:', err);
            res.status(500).json({ error: 'Error retrieving user by ID' });
        });
};

const updateUser = async (req, res) => {
    
    const { name, email, password } = req.body;
    const userId = req.params.id;
    
    try {
        const updatedUser = await user.findByIdAndUpdate(userId, { name, email, password }, { new: true });

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
};


const deleteuser = (req, res) => {
    user.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
        });
};

module.exports={
    usersget,
    usersgetbyid,
    updateUser,
    deleteuser
}