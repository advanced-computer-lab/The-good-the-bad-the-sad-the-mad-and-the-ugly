const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


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

UserSchema.plugin(passportLocalMongoose)

module.exports = User = mongoose.model('user', UserSchema);

