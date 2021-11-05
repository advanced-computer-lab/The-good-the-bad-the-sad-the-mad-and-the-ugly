
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));



router.get('/showAllFlights', (req, res) => {
    Flight.find()
        .then(flights => res.json(flights))
        .catch(err => res.json(err));
});

router.post('/showFlights', (req, res) => {
    var availableSeats ={};
    const data = {
        flightNumber: req.body.flightNumber,
        departureAirport: req.body.departureAirport,
        arrivalAirport: req.body.arrivalAirport,
        from: req.body.from,
        to: req.body.to,
        departure: req.body.departure,
        arrival: req.body.arrival,
        availableSeats: req.body.availableSeats
    }

    for(prop in data[availableSeats]){
        if(data[availableSeats][prop]==null)
            delete data[availableSeats][prop];
    }
    for (prop in data) {
         if (data[prop] === ""|| data[prop] === null) {
            delete data[prop];
        }

    }
    console.log(data);

    Flight.find(data)
        .then(flights => res.redirect('/showFlights'))
        .catch(err => console.log(err));
});
const x = new Date();
x.get

module.exports = router;