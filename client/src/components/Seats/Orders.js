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


export default function Orders(props) {

    return (
        <React.Fragment>
            <Title>Summary</Title>
            <Box>
                {props.missingSeats? <Alert severity={"error"} sx={{mb: 3}}>You must choose all your seats.</Alert> : null}
                {props.seatsNotAvailable? <Alert severity={"error"} sx={{mb: 3}}>The seats you chose are no longer available.</Alert> : null}
                {props.successfulSubmit? <Alert severity={"success"} sx={{mb: 3}}>Reservation submitted successfully. Your Booking ID: {props.reservationId}</Alert> : null}
                <Grid container>
                    <Grid item xs={6}>
                        {props.totalPrice && <Grid container>
                            <Grid item xs={5}>
                                <h4>Total Price: </h4>
                            </Grid>
                            <Grid item xs={7}>
                                <p>{props.totalPrice} EGP</p>
                            </Grid>
                        </Grid>}
                        {props.newSeats && <Grid container>
                            <Grid item xs={5}>
                                <h4>New Seats: </h4>
                            </Grid>
                            <Grid item xs={7}>
                                <p>{props.newSeats}</p>
                            </Grid>
                        </Grid>}
                    </Grid>
                    <Grid item xs={6} alignContent={"flex-end"}>
                        <Box
                            sx={{ textAlign: "end" }}
                        mr={7}>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={props.handleSubmit}
                            disabled={props.successfulSubmit}
                        >
                            Confirm
                        </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
