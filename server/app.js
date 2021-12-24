const express = require('express');
const app = express();
const passport = require('passport');
const {port, secret} = require('./config/config');
const User = require('./models/User');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

// Routes
const flightRouter = require('./routes/flightRouter')
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const reservationRouter = require('./routes/reservationRouter');
const emailRouter = require('./routes/emailRouter');
const userProfile = require('./routes/UserProfileRouter');
const paymentRouter = require("./routes/paymentsRouter");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());

//Setting sessions
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
}));

connectDB().then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());


passport.deserializeUser(User.deserializeUser());
// Connect Database

// giving the frontend the permission to access the back-end server
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));


// defining Routes parent
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/flight", flightRouter);
app.use("/reservation", reservationRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", userProfile);
app.use("/email", emailRouter);
app.use("/payment",paymentRouter)

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'airguc@gmail.com',
//         pass: '46-airguc'
//     }
// });
//
// var mailOptions = {
//     from: 'airguc@gmail.com',
//     to: 'mabubeih@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;