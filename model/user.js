const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    fname: String,
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('User', taskSchema);