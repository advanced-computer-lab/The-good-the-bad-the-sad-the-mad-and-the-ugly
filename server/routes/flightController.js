
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
    const data = {
        flightNumber: req.body.flightNumber,
        departureAirport: req.body.departureAirport,
        arrivalAirport: req.body.arrivalAirport,
        from: req.body.from,
        to: req.body.to,
        departure: {},
        arrival: {}
    }

    //variables to handle 1-Dates 2-Available Seats
    var availableSeats = req.body.availableSeats;
    var departure1 = req.body.departure1;
    var departure2 = req.body.departure2;
    var arrival1 = req.body.arrival1;
    var arrival2 = req.body.arrival2;
    var fDeparture = false;
    var fArrival = false;

    //1-Handling Dates of departure and arrival
    if (departure1 != '') {
        data["departure"]["$gte"] = new Date(departure1);
        fDeparture = true;
    }
    if (departure2 != '') {
        let secondDate = new Date(req.body.departure2);
        secondDate.setDate(secondDate.getDate() + 1);
        data["departure"]['$lte'] = new Date(secondDate);
        fDeparture = true;
    }

    if (arrival1 != '') {
        data["arrival"]["$gte"] = new Date(arrival1);
        fArrival = true;
    }
    if (arrival2 != '') {
        let secondDate = new Date(req.body.arrival2);
        secondDate.setDate(secondDate.getDate() + 1);
        data["arrival"]['$lte'] = new Date(secondDate);
        fArrival = true;
    }

    //2-Handling available seats of different types
    for (prop in availableSeats) {
        if (availableSeats[prop] === null || availableSeats[prop] === '') {
            delete availableSeats[prop];
        } else {
            switch (prop) {
                case 'economy':
                    data['availableSeats.economy'] = availableSeats.economy
                    break;
                case 'first':
                    data['availableSeats.first'] = availableSeats.first
                    break;
                case 'business':
                    data['availableSeats.business'] = availableSeats.business
                    break;
                default:
                    break;
            }
        }
    }


    //3-Handling any other field
    if (!fArrival) 
        delete data.arrival;
    if(!fDeparture)
        delete data.departure
    
    for (prop in data) {
        if (data[prop] === "" || data[prop] === null) {
            delete data[prop];
        }

    }

    
    Flight.find(data)
        .then(flights => {res.json(flights);})
        .catch(err => console.log(err));

});



module.exports = router;