const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);

