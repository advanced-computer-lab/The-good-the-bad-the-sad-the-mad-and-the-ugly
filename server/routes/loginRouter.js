// importing modules
const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
const User = require('../models/User');

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended: true}));


loginRouter.post('/', (req, res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        if(user.isAdmin)
        {
            return res.json({sucess:true, redirect:'/adminHomePage'});
        }else{
            return res.json({sucess:true, redirect:'/homePage'});
        }
    })(req, res, next);
});


// , passport.authenticate('local',
//     {
//         // failureRedirect: '/login',
//         // msg:'Invalid username or password'
//     }), (req, res) => {
//     const userTobeLoggedIn = {username: req.body.username};
//
//     User.findOne(userTobeLoggedIn)
//         .then(user => {
//             if (user.isAdmin) {
//                 res.json({success:true, direct:'/adminHomePage'});
//             } else {
//                 res.json({success:true, direct: '/homepage'});
//             }
//         }).catch(err => {
//
//     });
//
// }

module.exports = loginRouter;