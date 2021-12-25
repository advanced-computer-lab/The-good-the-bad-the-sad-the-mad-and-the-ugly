const express = require('express');
const registerRouter = express.Router();

registerRouter.use(express.json());
registerRouter.use(express.urlencoded({extended: true}));

// importing User Schema
const User = require('../models/User');

registerRouter.post('/', (req, res) => {

        const doc = {
            username: req.body.username,
            isAdmin: false,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            homeAddress: req.body.homeAddress,
            country: req.body.country,
            passportNumber: req.body.passportNumber
        };
        let Users = new User(doc);
        User.register(Users, req.body.password, (err, user) => {
                if (err) {
                    res.json({success: false, message: "Your account could not be saved. Error : ", err});
                    console.log(err)
                } else {
                    res.json({success: true, message: "Your account has been saved"});
                }
            }
        );
    }
);

registerRouter.get('/usernames', ((req, res) => {
    User.find({}).select('username')
        .then(usernames => {
            res.json(usernames)
        })
        .catch(err => console.log(err));
}));


module.exports = registerRouter;

