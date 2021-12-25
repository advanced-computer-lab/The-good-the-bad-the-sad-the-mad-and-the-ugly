const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        // required: true
    },

    sessionId: {
        type: String,
    },

    departureFlightId: {
        type: 'ObjectId',
        required: true
    },

    returnFlightId: {
        type: 'ObjectId',
        required: true
    },

    noOfAdults: {
        type: Number,
        required: true
    },

    noOfChildren: {
        type: Number,
        required: true
    },

    cabinClass: {
        dep: {
            type: String,
            required: true
        },
        ret: {
            type: String,
            required: true
        }
    },

    departureSeats: {
        type: [String],
        required: true
    },

    returnSeats: {
        type: [String],
        required: true
    },

    confirmed: {
        type: Boolean,
        required: true
    },

    timestamp: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);