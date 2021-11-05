const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({

        FlightNumber: {
            type: String,
            required: true
        },
        DepartureAirport:{
            type: String,
            required: true
        },
        ArrivalAirport:{
            type: String,
            required: true
        },
        From: {
            type: String,
            required: true
        },
        To: {
            type: String,
            required: true
        },
        Departure: {
            type: Date,
            required: true
        },
        Arrival:{
            type: Date,
            required: true
        },
        AvailableSeats:{
            Economy:{
                type: Number,
                required: true
            },
            Business:{
                type: Number,
                required: true
            },
            First: {
                type: Number,
                required: true
            },
        }
    }
)

module.exports = Flight = mongoose.model('flight', FlightSchema);
