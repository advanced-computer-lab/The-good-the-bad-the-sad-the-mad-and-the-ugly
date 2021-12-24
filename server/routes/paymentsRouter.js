const express = require('express');
const paymentRouter = express.Router();
paymentRouter.use(express.json());
paymentRouter.use(express.urlencoded({ extended: true }));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({error: stripeErr});
    } else {
        res.status(200).send({success: stripeRes});
    }
};
    paymentRouter.get("/", (req, res) => {
        res.send({
            message: "Hello Stripe checkout server!",
            timestamp: new Date().toISOString()
        });
    });
    paymentRouter.post("/", (req, res) => {
        const body = {
            source: req.body.token.id,
            amount: req.body.amount,
            currency: "EGP"
        };
        stripe.charges.create(body, stripeChargeCallback(res));
    });
module.exports = paymentRouter;