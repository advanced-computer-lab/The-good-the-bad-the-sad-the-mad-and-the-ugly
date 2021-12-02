const express = require('express');
const reservationRouter = express.Router();
const Reservation =  require('../models/Reservation');
reservationRouter.use(express.json());
reservationRouter.use(express.urlencoded({extended: true}));

reservationRouter.post('/createReservation', (req, res) => {
    Reservation.create(req.body)
        .then(reservation => res.json({ msg: 'Reservation added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this reservation' }));
});

reservationRouter.get('/showAllReservations', (req, res) => {
    Reservation.find()
        .then(reservations => res.json(reservations))
        .catch(err => res.json(err));
});

module.exports = reservationRouter;