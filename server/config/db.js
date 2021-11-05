const mongoose = require('mongoose');
const {db} = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(
            db,
            { useNewUrlParser: true }
        );
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;