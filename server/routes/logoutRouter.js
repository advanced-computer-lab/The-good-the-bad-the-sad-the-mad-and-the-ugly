const express = require('express');
const logoutRouter = express.Router();


logoutRouter.use(express.json());
logoutRouter.use(express.urlencoded({extended: true}));

logoutRouter.post('/', (req, res) => {
    req.logout();
    return res.json({msg: "logged out successfully!"});
});

module.exports = logoutRouter;