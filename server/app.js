const express = require('express');
const connectDB = require('./config/db');
const app = express();
const {port} = require('./config/config');


// Connect Database
connectDB().then(() => console.log('Connected to MongoDB'));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));