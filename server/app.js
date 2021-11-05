const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const flightController = require('./routes/flightController');

const app = express();
app.use(cors());
// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 8082;

app.use("/flight",flightController);

app.listen(port, () => console.log(`Server running on port ${port}`));