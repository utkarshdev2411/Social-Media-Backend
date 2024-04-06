const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require:true,
        unique:true

    },

    profile: {
        type: String,
    },

    password: {
        type: String,
        require: true
    },

}, { timestamp: true });

module.exports = mongoose.model('User', UserSchema);