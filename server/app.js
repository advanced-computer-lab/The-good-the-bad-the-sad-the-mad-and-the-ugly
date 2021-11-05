const express = require('express');
const connectDB = require('./config/db');
const app = express();
const {port} = require('./config/config');

const connectDB = require('./config/db');
const cors = require('cors');



// Routes
const flightRouter = require('./routes/flightController')

// Connect Database
connectDB().then(() => console.log('Connected to MongoDB'));

// giving the frontend the permission to access the back-end server
app.use(cors());

// defining Routes parent
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/flight" ,flightRouter);






app.listen(port, () => console.log(`Server running on port ${port}`));