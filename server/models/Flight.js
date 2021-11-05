const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    departure: {
        type: Date,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    economySeats: {
        type: Number,
        required: true
    },
    businessSeats: {
        type: Number,
        required: true
    },
    airport: {
        type: String,
        required: true
    }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);

