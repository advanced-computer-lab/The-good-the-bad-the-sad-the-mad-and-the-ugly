const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        required: true
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
        type: String,
        required: true
    },

    departureSeats: {
        type: [String],
        required: true
    },

    returnSeats: {
        type: [String],
        required: true
    }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);