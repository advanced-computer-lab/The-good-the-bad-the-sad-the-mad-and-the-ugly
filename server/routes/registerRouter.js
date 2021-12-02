// importing modules
// noinspection JSUnresolvedFunction

const express = require('express');
const registerRouter = express.Router();

registerRouter.use(express.json());
registerRouter.use(express.urlencoded({extended: true}));

// importing User Schema
const User = require('../models/User');

registerRouter.post('/', (req, res) => {

        let Users = new User({username: req.body.username,
            isAdmin:false,
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email});

        User.register(Users, req.body.password, (err, user) => {
                if (err) {
                    res.json({success: false, message: "Your account could not be saved. Error : ", err});
                } else {
                    res.json({success: true, message: "Your account has been saved"});
                }
            }
        );

        //console.log(req);
    }
);


module.exports = registerRouter;

