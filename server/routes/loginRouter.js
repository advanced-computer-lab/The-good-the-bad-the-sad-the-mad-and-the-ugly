// importing modules
const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
// const User = require('../models/User');


loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended: true}));


loginRouter.post('/', passport.authenticate('local', {failureRedirect: '/login/loginFailure' }),  function(req, res) {
    res.json({success: true, isAdmin: req.user.isAdmin});
});

loginRouter.get('/loginFailure', ((req, res) => {
    res.json({success: false});
}));

loginRouter.get('/authorize', (req, res) => {
    if (req.isAuthenticated()){
        return res.status(200).json({
            success: true,
            isAdmin: req.user.isAdmin,
            userId: req.user._id,
            firstName: req.user.firstName,
            email: req.user.email,
            lastName: req.user.lastName,
            passportNumber: req.user.passportNumber
        });
    } else {
        return res.json({success: false});
    }
})



module.exports = loginRouter;