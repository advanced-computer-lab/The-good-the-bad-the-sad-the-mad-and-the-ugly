const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({

        flightNumber: {
            type: String,
            required: true
        },
        departureAirport:{
            type: String,
            required: true
        },
        arrivalAirport:{
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        departure: {
            type: Date,
            required: true
        },
        arrival:{
            type: Date,
            required: true
        },
        availableSeats:{
            economy:{
                type: Number,
                required: true,
                min: 0
            },
            business:{
                type: Number,
                required: true,
                min: 0
            },
            first: {
                type: Number,
                required: true,
                min: 0
            }
        }
    }
)

module.exports = Flight = mongoose.model('flight', FlightSchema);
