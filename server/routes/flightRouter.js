const express = require('express');
const flightRouter = express.Router();
const Flight = require('../models/Flight');
const Reservation = require('../models/Reservation');
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
    if (departure1 !== '') {
        data["departure"]["$gte"] = new Date(departure1);
        fDeparture = true;
    }
    if (departure2 !== '') {
        let secondDate = new Date(req.body.departure2);
        secondDate.setDate(secondDate.getDate() + 1);
        data["departure"]['$lte'] = new Date(secondDate);
        fDeparture = true;
    }

    if (arrival1 !== '') {
        data["arrival"]["$gte"] = new Date(arrival1);
        fArrival = true;
    }
    if (arrival2 !== '') {
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
    if (!fDeparture)
        delete data.departure

    for (prop in data) {
        if (data[prop] === "" || data[prop] === null) {
            delete data[prop];
        }

    }


    Flight.find(data)
        .then(flights => {
            res.json(flights);
        })
        .catch(err => console.log(err));

});


flightRouter.post('/userShowFlights', (req, res) => {
    let now = Date.now();
    Reservation.find({ timestamp: { $lt: now - 60000 }, confirmed: false })
        .then(
            reservations => {
                // console.log(reservations);
                reservations.forEach((reservation) => {
                    Flight.findByIdAndUpdate(reservation.departureFlightId, { $inc: { [`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) } })
                        .then(res1 => {
                            console.log('successful departure flight update');
                        })
                    Flight.findByIdAndUpdate(reservation.returnFlightId, { $inc: { [`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) } })
                        .then(res1 => {
                            console.log('successful return flight update');
                        })
                });
                Reservation.deleteMany({ timestamp: { $lt: now - 600000 }, confirmed: false })
                    .then(
                        deleted => {
                            const departureData = {
                                from: req.body.from,
                                to: req.body.to,
                                departure: {},
                            }
                            const returningData = {
                                from: req.body.to,
                                to: req.body.from,
                                departure: {},
                            }
                            //variables to handle the following:

                            //I-Dates
                            // console.log(req.body.departure);
                            var departure = new Date(req.body.departure);
                            departure.setHours(departure.getHours() + 2);
                            // console.log(departure);
                            departure.setUTCHours(0, 0, 0, 0);
                            //departure.setDate(departure.getDate() -1);
                            // departure = new Date(departure.getFullYear(), departure.getMonth(), departure.getDay(), 0, 0, 0, 0);

                            var returning = new Date(req.body.returning);
                            returning.setHours(returning.getHours() + 2);
                            // console.log(returning);
                            returning.setUTCHours(0, 0, 0, 0);
                            //returning.setDate(returning.getDate() -1);
                            // returning = new Date(returning.getFullYear(), returning.getMonth(), returning.getDay(), 0, 0, 0, 0);

                            //II-class of seat and number of seats
                            var seatClass = req.body.seatClass;
                            var seats = parseInt(req.body.adultSeats) + parseInt(req.body.childrenSeats);


                            //1-Handling Dates of departure and returning
                            if (departure !== '' && returning !== '') {
                                departureData["departure"]["$gte"] = new Date(departure);
                                let departureSecondDate = new Date(departure);
                                departureSecondDate.setDate(departureSecondDate.getDate() + 1);
                                departureData["departure"]['$lt'] = new Date(departureSecondDate);

                                returningData["departure"]["$gte"] = new Date(returning);
                                let ArrivalSecondDate = new Date(returning);
                                ArrivalSecondDate.setDate(ArrivalSecondDate.getDate() + 1);
                                returningData["departure"]['$lt'] = new Date(ArrivalSecondDate);

                            }
                            // console.log(departureData);
                            // console.log(returningData);


                            //2-Handling available seats
                            switch (seatClass) {
                                case 'economy':
                                    departureData['availableSeats.economy'] = {$gte: seats};
                                    returningData['availableSeats.economy'] = {$gte: seats};
                                    break;
                                case 'first':
                                    departureData['availableSeats.first'] = {$gte: seats};
                                    returningData['availableSeats.first'] = {$gte: seats};
                                    break;
                                case 'business':
                                    departureData['availableSeats.business'] = {$gte: seats};
                                    returningData['availableSeats.business'] = {$gte: seats};
                                    break;
                                default:
                                    break;
                            }

                            const result = [];

                            async function find() {

                                await Flight.find(departureData)
                                    .then(flights => {
                                        result.push(flights);
                                    })
                                    .catch(err => console.log(err));

                                await Flight.find(returningData)
                                    .then(flights => {
                                        result.push(flights);
                                    })
                                    .catch(err => console.log(err));

                                res.json(result);
                            }

                            find();
                        }
                    )
            }
        )

});


flightRouter.post('/userEditFlight', (req, res) => {
    let now = Date.now();
    Reservation.find({ timestamp: { $lt: now - 60000 }, confirmed: false })
        .then(
            reservations => {
                // console.log(reservations);
                reservations.forEach((reservation) => {
                    Flight.findByIdAndUpdate(reservation.departureFlightId, { $inc: { [`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) } })
                        .then(res1 => {
                            console.log('successful departure flight update');
                        })
                    Flight.findByIdAndUpdate(reservation.returnFlightId, { $inc: { [`availableSeats.${reservation.cabinClass}`]: (reservation.noOfAdults + reservation.noOfChildren) } })
                        .then(res1 => {
                            console.log('successful return flight update');
                        })
                });
                Reservation.deleteMany({ timestamp: { $lt: now - 600000 }, confirmed: false })
                    .then(
                        deleted => {
                            const isDeparture = req.body.isDeparture;

                            var seatClass = req.body.seatClass;
                            var seats = parseInt(req.body.adultSeats) + parseInt(req.body.childrenSeats);

                            if (isDeparture) {

                                const departureData = {
                                    from: req.body.from,
                                    to: req.body.to,
                                    departure: {},
                                }
                                //variables to handle the following:

                                //I-Dates
                                // console.log(req.body.departure);
                                var departure = new Date(req.body.flightDate);
                                departure.setHours(departure.getHours() + 2);
                                // console.log(departure);
                                departure.setUTCHours(0, 0, 0, 0);
                                //departure.setDate(departure.getDate() -1);
                                // departure = new Date(departure.getFullYear(), departure.getMonth(), departure.getDay(), 0, 0, 0, 0);

                                //1-Handling Dates of departure and returning
                                if (departure !== '') {
                                    departureData["departure"]["$gte"] = new Date(departure);
                                    let departureSecondDate = new Date(departure);
                                    departureSecondDate.setDate(departureSecondDate.getDate() + 1);
                                    departureData["departure"]['$lt'] = new Date(departureSecondDate);

                                }
                                // console.log(departureData);
                                // console.log(returningData);


                                //2-Handling available seats
                                switch (seatClass) {
                                    case 'economy':
                                        departureData['availableSeats.economy'] = { $gte: seats };
                                        break;
                                    case 'first':
                                        departureData['availableSeats.first'] = { $gte: seats };
                                        break;
                                    case 'business':
                                        departureData['availableSeats.business'] = { $gte: seats };
                                        break;
                                    default:
                                        break;
                                }

                                let result = [];
                                async function find() {

                                    await Flight.find(departureData)
                                        .then(flights => { result.push(flights); })
                                        .catch(err => console.log(err));
                                    res.json(result);
                                }
                                find();
                            } else {

                                const returningData = {
                                    from: req.body.to,
                                    to: req.body.from,
                                    departure: {},
                                }
                                var returning = new Date(req.body.flightDate);
                                returning.setHours(returning.getHours() + 2);
                                // console.log(returning);
                                returning.setUTCHours(0, 0, 0, 0);

                                //1-Handling Dates of departure and returning
                                if (returning !== '') {
                                    returningData["departure"]["$gte"] = new Date(returning);
                                    let ArrivalSecondDate = new Date(returning);
                                    ArrivalSecondDate.setDate(ArrivalSecondDate.getDate() + 1);
                                    returningData["departure"]['$lt'] = new Date(ArrivalSecondDate);

                                }
                                switch (seatClass) {
                                    case 'economy':
                                        returningData['availableSeats.economy'] = { $gte: seats };
                                        break;
                                    case 'first':
                                        returningData['availableSeats.first'] = { $gte: seats };
                                        break;
                                    case 'business':
                                        returningData['availableSeats.business'] = { $gte: seats };
                                        break;
                                    default:
                                        break;
                                }

                                let result = [];
                                console.log(returningData);
                                async function find() {

                                    await Flight.find(returningData)
                                        .then(flights => { result.push(flights); })
                                        .catch(err => console.log(err));

                                    await Flight.find(returningData)
                                        .then(flights => { result.push(flights); })
                                        .catch(err => console.log(err));

                                    res.json(result);
                                }
                                find();
                            }
                        }
                    )
            }
        )

});




flightRouter.delete('/delete/:id', (req, res) => {
    Flight.findByIdAndRemove(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => res.status(404).json({error: 'No such flight'}));
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
        .then(flight => res.json({success: true, msg: 'Updated successfully!'}))
        .catch(err => res.status(400).json({success: false, error: 'Unable to update the Database'})
        );
});


// @route GET /flight
// @description add/save flight
// @access Public
flightRouter.post('/', (req, res) => {
    Flight.create(req.body)
        .then(flight => res.json({success: true, msg: 'Flight added successfully'}))
        .catch(err => {
            console.log(err)
            res.status(400).json({success: false, error: 'Unable to add this flight'})

        });
});


//
// exporting the router
module.exports = flightRouter;






