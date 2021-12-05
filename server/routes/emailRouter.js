const express = require('express');
const emailRouter = express.Router();
const nodemailer = require('nodemailer');
const {emailPassword} = require('../config/config');
emailRouter.use(express.json());
emailRouter.use(express.urlencoded({extended: true}));


emailRouter.post('/sendEmail', (req, res) => {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'airguc@gmail.com',
            pass: emailPassword
        }
    });

    var mailOptions = {
        from: 'airguc@gmail.com',
        to: req.body.userEmail,
        subject: req.body.mailSubject,
        text: req.body.mailContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        // console.log(emailPassword);
        if (error) {
            // console.log(error);
            res.json(error);
        } else {
            // console.log('Email sent: ' + info.response);
            res.json('success');
        }
    });
})


module.exports = emailRouter;