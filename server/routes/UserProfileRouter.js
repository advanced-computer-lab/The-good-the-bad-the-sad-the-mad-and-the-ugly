const express = require('express');
const userProfileRouter = express.Router();

userProfileRouter.use(express.json());
userProfileRouter.use(express.urlencoded({extended: true}));

// importing User Schema
const User = require('../models/User');


userProfileRouter.post('/editProfile', async (req, res) => {


    console.log(req.body);
    console.log(req.user);
    if (!req.user)
        res.redirect('/login')

    const username = req.user.username;

    let userDocument = await User.findOne({username: username})
        .catch(err => console.log(err));

    Object.keys(req.body).forEach(key => {
        // if (userDocument[key] && key !== 'isAdmin') {
            userDocument[key] = req.body[key];
        // }

    });
    console.log(userDocument)

    await userDocument.save();
    res.sendStatus(200);
});


userProfileRouter.get('/', (req, res) => {
    const userReq = req.user;
    if (!userReq) {
        res.json({success: false, message: 'Not logged in'});
    } else {
        const q = {username: userReq.username};
        User.find(q)
            .then(result => {
                //console.log(result);
                res.json({success: true, result})
            })
            .catch(err => console.log(err));
    }
});

module.exports = userProfileRouter;
