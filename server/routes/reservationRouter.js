const express = require('express');
const reservationRouter = express.Router();
const Reservation = require('../models/Reservation');
const Flight = require('../models/Flight');
const mongoose = require('mongoose');
const _ = require('lodash');
const {Mongoose} = require("mongoose");
reservationRouter.use(express.json());
reservationRouter.use(express.urlencoded({extended: true}));

reservationRouter.post('/createReservation', (req, res) => {
    if (!req.body.confirmed) {
        req.body.sessionId = req.sessionID;
    }
    Reservation.create(req.body)
        .then(reservation => {
            // console.log(reservation);
            Flight.findByIdAndUpdate(req.body.departureFlightId,
                {$inc: {[`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) * -1}})
                .then(res1 => {
                    console.log('successful departure flight update');
                })
            Flight.findByIdAndUpdate(req.body.returnFlightId, {$inc: {[`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) * -1}})
                .then(res1 => {
                    console.log('successful departure flight update');
                })
            res.json({msg: 'Reservation added successfully', reservationId: reservation._id});
        })
        .catch(err => res.status(400).json({error: 'Unable to add this reservation'}));
});

reservationRouter.get('/showAllReservations', (req, res) => {
    Reservation.find()
        .then(reservations => res.json(reservations))
        .catch(err => res.json(err));
});

reservationRouter.get('/getReservationById/:id', (req, res) => {
    Reservation.findById(req.params.id)
        .then(
            reservation => {
                res.json(reservation);
            }
        )
        .catch(
            err => {
                res.json(err);
            }
        );
});

reservationRouter.get('/getReservationBySessionId', (req, res) => {
    Reservation.find({sessionId: req.sessionID})
        .then(
            reservation => {
                // console.log(reservation);
                res.json(reservation[0]._id);
            }
        )
        .catch(
            err => {
                res.json(err);
            }
        );
});

reservationRouter.get('/getReservedSeatsInFlight/:flightId/:cabinClass', (req, res) => {
    // let now = Date.now();
    // console.log(now);
    // Reservation.find({ timestamp: { $gt: now + 60000 }, confirmed: false })
    //     .then(reservations => {
    //         console.log(reservations);
    //     });
    // Reservation.deleteMany({timestamp: {$lt: now - 600000}, confirmed: false})
    //     .then(deleted => {
    Reservation.aggregate([
        {
            $match: {
                departureFlightId: mongoose.Types.ObjectId(req.params.flightId),
                cabinClass: req.params.cabinClass
            }
        },
        {$project: {departureSeats: 1, _id: 0}},
        {
            $unionWith: {
                coll: "reservations",
                pipeline: [
                    {
                        $match: {
                            returnFlightId: mongoose.Types.ObjectId(req.params.flightId),
                            cabinClass: req.params.cabinClass
                        }
                    },
                    {$project: {returnSeats: 1, _id: 0}}]
            }
        }
    ]).then(seats => {
        console.log(seats);
        res.json(_.flatten(
        seats.map(seat => seat['departureSeats'] != null ? seat['departureSeats'] : seat['returnSeats']
        )
    ))
})
        .catch(err => res.json(err));
    // })
    // .catch(err => {
    //     res.json(err);
    // })

});

reservationRouter.put('/updateReservation/:id', (req, res) => {
    // let updateQuery = req.body;
    // updateQuery['$project'] = {sessionId: 0};
    req.body.departureFlightId = mongoose.Types.ObjectId(req.body.departureFlightId);
    req.body.returnFlightId = mongoose.Types.ObjectId(req.body.returnFlightId);
    // req.body.timestamp = new Date(req.body.timestamp);
    Reservation.findByIdAndUpdate(req.params.id, [{$set: req.body}, {$project: {sessionId: 0}}])
        .then(reservation => {
            res.json({success: true});
        })
        .catch(err => {
            res.json(err);
        })
});

reservationRouter.delete('/delete/:id', (req, res) => {
    Reservation.findByIdAndRemove(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => res.status(404).json({ error: 'No such Reservation' }));
});

module.exports = reservationRouter;