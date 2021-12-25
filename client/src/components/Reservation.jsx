import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, {Component, useEffect, useState} from 'react'
import {
    TableCell,
    TableRow,
    Button,
    tableCellClasses,
    Collapse,
    Accordion,
    AccordionSummary,
    AccordionDetails, Menu, MenuItem
} from "@mui/material";
import DeleteModal from "./DeleteModal";
import {styled} from '@mui/material/styles';
import axios from "axios";
import FlightCard from "./FlightCard";
import DeleteModal2 from "./DeleteModal2";
import UserFlightCard from "./UserFlightCard";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from "moment";
import {useNavigate} from "react-router-dom";


const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

function Reservation(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         depFlight: [],
    //         retFlight: [],
    //         expanded: false,
    //         expanded2: false,
    //         modalOpen: false,
    //         anchorEl1: null
    //         // anchorEl2: null
    //     };
    // };

    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            depFlight: [],
            retFlight: [],
            expanded: false,
            expanded2: false,
            modalOpen: false,
            // anchorEl1: null
            // anchorEl2: null
        }
    );

    const [anchorEl1, setAnchorEl1] = useState(null);
    const handleDepClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleDepClose = () => {
        setAnchorEl1(null);
    };

    const open1 = Boolean(anchorEl1);

    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleRetClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleRetClose = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);

    useEffect(() => {
        axios
            .get('http://localhost:8000/flight/getFlightById/' + props.reservation.returnFlightId)
            .then(res => {
                setState(
                    prevState => {
                        return {
                            ...prevState,
                            retFlight: res.data
                        }
                    });
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })

        axios
            .get('http://localhost:8000/flight/getFlightById/' + props.reservation.departureFlightId)
            .then(res => {
                console.log(res.data);
                setState(
                    prevState => {
                        return {
                            ...prevState,
                            depFlight: res.data
                        }
                    });

            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    }, []);

    // handleExpandClick = () => {
    //     const current = this.state.expanded;
    //     this.setState({
    //         expanded: !current
    //     })
    // };
    // handleExpandClick2 = () => {
    //     const current = this.state.expanded2;
    //     this.setState({
    //         expanded2: !current
    //     })
    // };
    const handleOpen = () => {
        setState(prevState => {
                return {
                    ...prevState,
                    modalOpen: true
                }
            }
        )
    };
    const handleClose = () => {
        setState(prevState => {
                return {
                    ...prevState,
                    modalOpen: false
                }
            }
        )
    };

    // render() {
    // const card = (
    //     <React.Fragment>
    //     </React.Fragment>
    // );
    // const StyledTableCell = styled(TableCell)(({theme}) => ({
    //     [`&.${tableCellClasses.head}`]: {
    //         backgroundColor: theme.palette.common.black,
    //         color: theme.palette.common.white,
    //     },
    //     [`&.${tableCellClasses.body}`]: {
    //         fontSize: 14,
    //     },
    // }));
    //
    // const StyledTableRow = styled(TableRow)(({theme}) => ({
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.action.hover,
    //     },
    //     // hide last border
    //     '&:last-child td, &:last-child th': {
    //         border: 0,
    //     },
    // }));
    return (
        //     <Box sx={{ minWidth: 200 }}>
        //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        //             <strong>Adults:</strong> {this.props.reservation.noOfAdults}
        //             <br/>
        //             <strong>Children: </strong>{this.props.reservation.noOfChildren}
        //             <br/>
        //             <strong>Cabin Class: </strong>{this.props.reservation.cabinClass}
        //             <br/>
        //             <strong>Total Price: </strong>{this.props.reservation.totalPrice}
        //         </Typography>
        //         <Button variant="outlined" onClick={this.handleExpandClick}>Departure Flight</Button>
        //         <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        //         <UserFlightCard flight={this.state.depFlight} reservation={this.props.reservation}/>
        //         </Collapse>
        //         <br/>
        //         <br/>
        //         <Button variant="outlined" onClick={this.handleExpandClick2}>Return Flight</Button>
        //         <Collapse in={this.state.expanded2} timeout="auto" unmountOnExit>
        //         <UserFlightCard flight={this.state.retFlight} reservation={this.props.reservation}/>
        //         </Collapse>
        //         <br/>
        //         <StyledTableRow>
        //         <StyledTableCell><Button color={"error"} onClick={this.handleOpen}>Cancel Reservation</Button></StyledTableCell>
        //             <DeleteModal2 ReservationId={this.props.reservation._id} deleteFunc={this.props.deleteFunction} modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
        //         </StyledTableRow>
        // </Box>
        <Card sx={{maxWidth: 900, mb: 3}}>
            <CardContent>
                <Typography mb={2} variant={"h5"} align={"left"}>
                    <strong>Reservation</strong> {props.reservation._id}
                </Typography>
                <Grid container mb={3}>
                    <Grid item xs={2} md={3}>
                        <Typography variant={"body1"}>
                            <strong>Number of adults:</strong> {props.reservation.noOfAdults}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <Typography variant={"body1"}>
                            <strong>Number of children:</strong> {props.reservation.noOfChildren}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <Typography variant={"body1"}>
                            <strong>Cabin class:</strong> {props.reservation.cabinClass}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <Typography variant={"body1"}>
                            <strong>Total price:</strong> {props.reservation.totalPrice} EGP
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
                            <Typography>
                                <strong>Departure Flight</strong>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>From:</strong> {state.depFlight.from} ({state.depFlight.departureAirport})
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>To:</strong> {state.depFlight.to} ({state.depFlight.arrivalAirport})
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Flight Number:</strong> {state.depFlight.flightNumber}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Departure:</strong> {moment.utc(state.depFlight.departure, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Arrival:</strong> {moment.utc(state.depFlight.arrival, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Seats:</strong> {props.reservation.departureSeats.reduce(((previousValue, currentValue, currentIndex) => {
                                        return currentIndex !== props.reservation.departureSeats.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`
                                    }), '')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6} alignContent={"flex-end"}>
                                    <Box
                                        sx={{textAlign: "end"}}
                                    >
                                        <div>
                                            <Button
                                                id="dep-button"
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open1 ? 'true' : undefined}
                                                onClick={handleDepClick}
                                            >
                                                Edit
                                            </Button>
                                            <Menu
                                                id="dep-menu"
                                                anchorEl={anchorEl1}
                                                open={open1}
                                                onClose={handleDepClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => {navigate(`/changeReservationSeats/${props.reservation._id}/departureSeats`)}}>Change Seats</MenuItem>
                                                <MenuItem onClick={handleDepClose}>Change Flight</MenuItem>
                                            </Menu>
                                        </div>
                                    </Box>

                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>
                                <strong>Return Flight</strong>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>From:</strong> {state.retFlight.from} ({state.retFlight.departureAirport})
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>To:</strong> {state.retFlight.to} ({state.retFlight.arrivalAirport})
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        <strong>Flight Number:</strong> {state.retFlight.flightNumber}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Departure:</strong> {moment.utc(state.retFlight.departure, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Arrival:</strong> {moment.utc(state.retFlight.arrival, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography>
                                        <strong>Seats:</strong> {props.reservation.returnSeats.reduce(((previousValue, currentValue, currentIndex) => {
                                        return currentIndex !== props.reservation.returnSeats.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`
                                    }), '')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6} alignContent={"flex-end"}>
                                    <Box
                                        sx={{textAlign: "end"}}
                                    >
                                        <div>
                                            <Button
                                                id="ret-button"
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open2 ? 'true' : undefined}
                                                onClick={handleRetClick}
                                            >
                                                Edit
                                            </Button>
                                            <Menu
                                                id="ret-menu"
                                                anchorEl={anchorEl2}
                                                open={open2}
                                                onClose={handleRetClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => {navigate(`/changeReservationSeats/${props.reservation._id}/returnSeats`)}}>Change Seats</MenuItem>
                                                <MenuItem onClick={handleRetClose}>Change Flight</MenuItem>
                                            </Menu>
                                        </div>

                                    </Box>

                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Grid container mt={3}>
                    <Grid item md={12} alignContent={"flex-end"}>
                        <Box
                            sx={{textAlign: "end"}}
                        >
                            <div>
                            <Button color={"error"} onClick={handleOpen}>Cancel Reservation</Button>
                                <DeleteModal2 ReservationId={props.reservation._id} deleteFunc={props.deleteFunction} modalOpen={state.modalOpen} handleClose={handleClose}/>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
    // }
}

export default Reservation;