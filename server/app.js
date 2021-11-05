const express = require('express');
const connectDB = require('./config/db');
const app = express();
const session = require('express-session');
const passport = require('passport');
const {port} = require('./config/config');

const cors = require('cors');



// Routes
const flightRouter = require('./routes/flightController')

app.use(session({
    secret: 'Simpy Ahmad',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect Database
connectDB().then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

// giving the frontend the permission to access the back-end server
app.use(cors());

// defining Routes parent
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/flight" ,flightRouter);






app.listen(port, () => console.log(`Server running on port ${port}`));