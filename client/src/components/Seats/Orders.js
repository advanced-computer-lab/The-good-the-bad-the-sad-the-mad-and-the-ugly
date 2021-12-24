import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {Box, Button, Grid} from "@mui/material";
import {Alert} from "@mui/lab";
import StripeBtn from '../stripeBtn'
import axios from "axios";

export default function Orders(props) {
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
        <React.Fragment>
            <Title>Summary</Title>
            <Box>
                {props.missingSeats? <Alert severity={"error"} sx={{mb: 3}}>You must choose all your seats.</Alert> : null}
                {props.seatsNotAvailable? <Alert severity={"error"} sx={{mb: 3}}>The seats you chose are no longer available.</Alert> : null}
                {props.successfulSubmit? <Alert severity={"success"} sx={{mb: 3}}>Reservation submitted successfully. Your Booking ID: {props.reservationId}</Alert> : null}
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={5}>
                                <h4>Total Price: </h4>
                            </Grid>
                            <Grid item xs={7}>
                                <p>{props.totalPrice} EGP</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} alignContent={"flex-end"}>
                        <Box
                            sx={{ textAlign: "end" }}
                        mr={7}>
                            {props.isLoggedIn?<StripeBtn onClick={props.handleSubmit} validate={props.validate} price={props.totalPrice}/>:<Button
                            type="submit"
                            variant="contained"
                            onClick={props.handleSubmit}
                            disabled={props.successfulSubmit}
                        >
                            Confirm
                        </Button>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
