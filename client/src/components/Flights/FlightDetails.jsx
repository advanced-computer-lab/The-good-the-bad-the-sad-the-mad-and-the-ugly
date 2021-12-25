import React, {useEffect, useState} from 'react';
import {Card} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import {Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, Menu, MenuItem} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';

import Box from "@mui/material/Box";
import DeleteModal2 from "../DeleteModal2";
import DeleteModal from "../DeleteModal";


export default function FlightDetails(props) {


    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const data = props.flight;

    return (
        <Card style={{marginBottom: "20px"}}>
            <CardContent>
                <Typography mb={2} variant={"h5"} align={"left"}>
                    <strong>{data.flightNumber}</strong>
                </Typography>
                <Grid container mb={3}>
                    <Grid item xs={2} md={2}>
                        <Typography variant={"h4"}>
                            <strong>{data.from}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={8}>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Typography variant={"h4"}>
                            <strong>{data.to}</strong>
                        </Typography>
                    </Grid>

                    <Grid item xs={2} md={2}>
                        <Typography variant={"h6"}>
                            {moment.utc(data.departure, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                        </Typography>
                    </Grid>

                    <Grid item xs={2} md={8}>

                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Typography variant={"h6"}>
                            {moment.utc(data.arrival, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                        </Typography>
                    </Grid>
                </Grid>
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography color="primary">
                                <strong>Flight Details</strong>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <Divider>Price Details</Divider>
                                </Grid>

                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Economy Adult Price: </strong>{data.price.economy.adult} EGP
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Business Adult Price: </strong>{data.price.business.adult} EGP
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>First Class Adult Price: </strong>{data.price.first.adult} EGP
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Economy Child Price: </strong>{data.price.economy.child} EGP
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Business Child Price: </strong>{data.price.business.child} EGP
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>First Class Child Price: </strong>{data.price.first.child} EGP
                                    </Typography>
                                </Grid>

                                <Grid item md={12}>
                                    <Divider>Seats</Divider>
                                </Grid>

                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Economy Seats: </strong>{data.maxSeats.economy}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Business Seats: </strong>{data.maxSeats.business}
                                    </Typography>
                                </Grid>

                                <Grid item md={4}>
                                    <Typography>
                                        <strong>First Class Seats: </strong>{data.maxSeats.first}
                                    </Typography>
                                </Grid>

                                <Grid item md={12}>
                                    <Divider> Flight Info</Divider>

                                </Grid>
                                <Grid item md={3}>
                                    <Typography>
                                        <strong>Departure Airport: </strong>{data.departureAirport}
                                    </Typography>
                                </Grid>
                                <Grid item md={5}></Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Arrival Airport: </strong>{data.arrivalAirport}
                                    </Typography>
                                </Grid>

                                <Grid item md={3}>
                                    <Typography>
                                        <strong>Departure Terminal: </strong>{data.departureTerminal}
                                    </Typography>
                                </Grid>
                                <Grid item md={5}></Grid>

                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Arrival Terminal: </strong>{data.arrivalTerminal}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>

                                </Grid>
                                <Grid item md={7}>
                                    <Typography>
                                        <strong>Baggage Allowance: </strong>{data.baggageAllowance}
                                    </Typography>
                                </Grid>


                                <Grid item md={2}>

                                        <Button style={{marginTop: "25px"}} variant="outlined" onClick={handleOpen} color={'error'} startIcon={<DeleteIcon/>}>
                                            Delete
                                        </Button>

                                </Grid>
                                <Grid item md={8}>
                                </Grid>
                                <Grid item md={2} sx={{display: "flex", justifyContent: "center"}}>
                                    {/*<Button sx={{mr: 2}} variant="contained"*/}
                                    {/*        href={`/updateFlight/${data._id}`}> EDIT</Button>*/}
                                    {/*<Button variant="outlined" onClick={handleOpen} color={'error'} startIcon={<DeleteIcon/>}>*/}
                                    {/*    Delete*/}
                                    {/*</Button>*/}
                                        <Button variant="contained"
                                                sx={{mt: 3, ml: 1}}
                                                href={`/updateFlight/${data._id}`}>
                                            Edit</Button>

                                </Grid>
                            </Grid>

                            <DeleteModal flightId={data._id} deleteFunc={props.deleteFunction}
                                         flightNumber={data.flightNumber} modalOpen={modalOpen}
                                         handleClose={handleClose}/>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </CardContent>
        </Card>

    )
        ;


}