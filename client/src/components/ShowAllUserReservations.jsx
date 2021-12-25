import React, {Component} from 'react';
import axios from 'axios';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Reservation from "./Reservation";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {Box, Card, Paper} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";


class ShowAllUserReservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            userFirstName: '',
            userEmail: ''
        };
        this.deleteReservation = this.deleteReservation.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8000/login/authorize')
            .then(res => {
                if (res.data.success) {
                    axios
                        .get(`http://localhost:8000/reservation/getUserReservations/${res.data.userId}`)
                        .then(res1 => {
                            this.setState({
                                reservations: res1.data,
                                userFirstName: res.data.firstName,
                                userEmail: res.data.email,
                                passportNumber: res.data.passportNumber,
                                userLastName: res.data.lastName
                            })
                        })
                        .catch(err => {
                            console.log('Error in showAllUserReservations');
                        })
                } else {
                    window.location.href = '/login'
                }
            })

    };

    deleteReservation(event) {
        axios
            .delete('http://localhost:8000/reservation/delete/' + event.target.name)
            .then(res => {
                let reservationRemoved = res.data;
                console.log(reservationRemoved);
                let newReservations = [];
                this.state.reservations.forEach(function (item) {
                    if (item._id !== reservationRemoved._id)
                        newReservations.push(item);
                })
                this.setState({
                    reservations: newReservations
                });
                let emailData = {
                    mailSubject: 'Booking Cancellation Notification',
                    mailContent: `Hi ${this.state.userFirstName},\nYour recent booking (Booking ID: ${res.data._id}) has been cancelled.\nYou will be refunded an amount of: ${res.data.totalPrice} EGP.\n\nSincerely,\nAir GUC`,
                    userEmail: this.state.userEmail
                }
                axios.post('http://localhost:8000/email/sendEmail', emailData)
                    .then(
                        res1 => {
                            console.log(res1.data);
                        }
                    ).catch(err1 => {
                    console.log(err1);
                })
            })
    }


    render() {
        const theme = createTheme();
        const reservations = this.state.reservations;
        let reservationList;
        if (!reservations) {
            reservationList = "there is no flight record!";
        } else {
            reservationList = reservations.map((reservation) =>
                // <Card sx={{p: 4, m: 2, textAlign: "center"}}>
                    <Grid item xs={12} sm={12} md={12} key={reservation._id}>
                        <Reservation reservation={reservation} key={reservation._id}
                                     deleteFunction={this.deleteReservation} email={this.state.userEmail}
                        />
                    </Grid>
                // </Card>
        )
        }

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container maxWidth="lg" sx={{mb: 4}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <Card sx={{maxWidth: 900, mb: 3, mt: 3, p: 3}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p><strong>First Name:</strong></p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p>{this.state.userFirstName}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p><strong>Last Name:</strong></p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p>{this.state.userLastName}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <p><strong>Email:</strong></p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <p>{this.state.userEmail}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p><strong>Passport Number:</strong></p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p>{this.state.passportNumber}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>
                </Container>
                <Container maxWidth="md" sx={{mb: 4}}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        {reservationList}
                    </Box>

                </Container>
            </ThemeProvider>
        )
    }
}

export default ShowAllUserReservations;