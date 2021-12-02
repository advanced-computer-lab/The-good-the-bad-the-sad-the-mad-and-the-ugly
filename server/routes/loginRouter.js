// importing modules
const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');
// const User = require('../models/User');


loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended: true}));


// loginRouter.post('/', (req, res,next) => {
//     passport.authenticate('local', {session: true},(err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.json({success:false});
//         }
//         // console.log(req.user);
//         if(user.isAdmin)
//         {
//             return res.json({success:true, redirect:'/adminHomePage'});
//         }
//         else{
//             return res.json({success:true, redirect:'/homePage'});
//         }
//     })(req, res, next);
// });

loginRouter.post('/', passport.authenticate('local', { failureRedirect: '/login/loginFailure' }),  function(req, res) {
    // console.log(req.user)
    res.json({success: true, isAdmin: req.user.isAdmin});
});

loginRouter.get('/loginFailure', ((req, res) => {
    res.sendStatus(401);
}))

loginRouter.get('/authorize', (req, res) => {
    // console.log(req);
    if (req.user){
        return res.status(200).json({isAdmin: req.user.isAdmin});
    } else {
        return res.sendStatus(401);
    }
})

module.exports = loginRouter;