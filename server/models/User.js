const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passportNumber: {
        type: String,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);
User = mongoose.model('user', UserSchema);


module.exports = User;


