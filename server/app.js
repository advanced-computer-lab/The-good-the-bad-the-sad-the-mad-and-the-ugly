const express = require('express');
const app = express();
const passport = require('passport');
const {port,secret} = require('./config/config');
const User = require('./models/User');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');


// Routes
const flightRouter = require('./routes/flightRouter')
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');

app.use(bodyParser.json());

//Setting sessions
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;
passport.use(User.createStrategy());


// Connect Database
connectDB().then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

// giving the frontend the permission to access the back-end server
app.use(cors());


// defining Routes parent
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/flight", flightRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));
