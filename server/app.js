const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');



// Routes
const flightRouter = require('./routes/flightController')

// Connect Database
connectDB();

// giving the frontend the permission to access the back-end server
app.use(cors());

// defining Routes parent
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/flight" ,flightRouter);





const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));