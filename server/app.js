const express = require('express');
const connectDB = require('./config/db');
const app = express();
const session = require('express-session');
const passport = require('passport');
const {port} = require('./config/config');


app.use(session({
    secret: 'Simpy Ahmad',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect Database
connectDB().then(() => console.log('Connected to MongoDB'));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));