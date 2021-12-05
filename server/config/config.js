const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db: process.env.db,
    port: process.env.PORT,
    secret: process.env.SessionWord,
    emailPassword: process.env.emailPassword
};