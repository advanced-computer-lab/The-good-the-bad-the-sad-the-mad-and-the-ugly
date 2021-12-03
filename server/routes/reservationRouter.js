const express = require('express');
const reservationRouter = express.Router();
const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');
const _ = require('lodash');
reservationRouter.use(express.json());
reservationRouter.use(express.urlencoded({extended: true}));

reservationRouter.post('/createReservation', (req, res) => {
    Reservation.create(req.body)
        .then(reservation => res.json({msg: 'Reservation added successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to add this reservation'}));
});

reservationRouter.get('/showAllReservations', (req, res) => {
    Reservation.find()
        .then(reservations => res.json(reservations))
        .catch(err => res.json(err));
});

reservationRouter.get('/getReservedSeatsInFlight/:flightId/:cabinClass', (req, res) => {
    Reservation.aggregate([
        {$match: {departureFlightId: mongoose.Types.ObjectId(req.params.flightId), cabinClass: req.params.cabinClass}},
        {$project: {departureSeats: 1, _id: 0}},
        {
            $unionWith: {
                coll: "reservations",
                pipeline: [
                    {$match: {returnFlightId: mongoose.Types.ObjectId(req.params.flightId), cabinClass: req.params.cabinClass}},
                    {$project: {returnSeats: 1, _id: 0}}]
            }
        }
    ]).then(seats => res.json(_.flatten(
        seats.map(seat => seat['departureSeats'] != null ? seat['departureSeats'] : seat['returnSeats']
        )
    )))
        .catch(err => res.json(err));
})

module.exports = reservationRouter;