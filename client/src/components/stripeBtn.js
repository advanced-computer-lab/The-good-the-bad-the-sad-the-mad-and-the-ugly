import React, {Fragment} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "@mui/material/Button";

const stripeBtn = (props) => {
    const publishableKey = "pk_test_51K9yp2DM9EPbGwDz1PBNixOdUT1f83oz9OIqNW7bO67GecVkfoAvmD8uUGsn6sn4ECYZxyZOsbkiGVoRz4UQAFgW00GrXFFdfN";
    const onToken = token => {
        const body = {
            amount: 999,
            token: token
        };
        axios
            .post("http://localhost:8000/payment", body)
            .then(response => {
                console.log(response);
                props.onClick();
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };
    return (
        props.validate() ?
            <StripeCheckout
                label="Pay" //Component button text
                name="Air GUC" //Modal Header
                description="The World within your hands"
                panelLabel="Pay Now" //Submit button in modal
                amount={props.price*100} //Amount in cents $9.99
                token={onToken}
                stripeKey={publishableKey}
                //Pop-in header image
                billingAddress={false}
                currency="EGP"
            /> : <Button onClick={props.onClick}>Pay</Button>
    );
};
export default stripeBtn;