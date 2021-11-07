const express = require('express');
const flightRouter = express.Router();
const Flight =  require('../models/Flight');
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: true}));


flightRouter.get('/showAllFlights', (req, res) => {
    Flight.find()
        .then(flights => res.json(flights))
        .catch(err => res.json(err));
});

flightRouter.post('/showFlights', (req, res) => {
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

flightRouter.delete('/delete/:id', (req, res) => {
    Flight.findByIdAndRemove(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => res.status(404).json({ error: 'No such flight' }));
});

// get, read, delete and update methods:
//

flightRouter.get('/getFlightById/:id', (req, res) => {
    Flight.findById(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => res.status(400).json({error: 'Unable to get flight data'}));
});

flightRouter.put('/updateFlight/:id', (req, res) => {
    Flight.findByIdAndUpdate(req.params.id, req.body)
        .then(flight => res.json({msg: 'Updated successfully!'}))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' })
        );
});


// @route GET /flight
// @description add/save flight
// @access Public
flightRouter.post('/', (req, res) => {
    Flight.create(req.body)
        .then(flight => res.json({ msg: 'Flight added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});



//
// exporting the router
module.exports = flightRouter;






