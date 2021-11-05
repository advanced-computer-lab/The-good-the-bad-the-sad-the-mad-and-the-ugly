const express = require('express');
const flightRouter = express.Router();
const Flight =  require('../models/Flight');
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: true}));


// get, read, delete and update methods:
//




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






