// importing modules
const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
const User = require('../models/User');

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended: true}));


loginRouter.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.json({success:false});
        } else if (user.isAdmin) {
            return res.json({success: true, redirect: '/adminHomePage'});
        } else {
            return res.json({success: true, redirect: '/homePage'});
        }
    })(req, res, next);
});


loginRouter.get('/auth', (req, res) => {
    if (req.user)
        return res.json({req});
    else
        return res.json({success: false, request: req.user});
});

module.exports = loginRouter;