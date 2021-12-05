import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, {Component, useState} from 'react'
import {TableCell, TableRow, Button, tableCellClasses, Collapse} from "@mui/material";
import DeleteModal from "./DeleteModal";
import { styled } from '@mui/material/styles';
import axios from "axios";
import FlightCard from "./FlightCard";
import DeleteModal2 from "./DeleteModal2";
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            depFlight:[],
            retFlight:[],
            expanded:false,
            expanded2:false,
            modalOpen: false
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/flight/getFlightById/'+ this.props.reservation.returnFlightId)
            .then(res => {
                this.setState({
                    retFlight: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })

        axios
            .get('http://localhost:8000/flight/getFlightById/'+ this.props.reservation.departureFlightId)
            .then(res => {
                this.setState({
                    depFlight: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    };
    handleExpandClick = () => {
        const current=this.state.expanded;
        this.setState({
            expanded:!current
    })
    };
    handleExpandClick2 = () => {
        const current = this.state.expanded2;
        this.setState({
            expanded2: !current
        })
    };
    handleOpen = () => {
        this.setState({
            modalOpen:true
        })
    };
    handleClose = () => {
        this.setState({
            modalOpen:false
        })
    };
    render() {
        const card = (
            <React.Fragment>
            </React.Fragment>
        );
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));
        return (
            <Box sx={{ minWidth: 200 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <strong>Adults :</strong> {this.props.reservation.noOfAdults}
                    <br/>
                    <strong>Children : </strong>{this.props.reservation.noOfChildren}
                    <br/>
                    <strong>Cabin Class : </strong>{this.props.reservation.cabinClass}
                </Typography>
                <Button variant="outlined" onClick={this.handleExpandClick}>Departure Flight</Button>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <FlightCard flight={this.state.depFlight} reservation={this.props.reservation}></FlightCard>
                </Collapse>
                <br/>
                <br/>
                <Button variant="outlined" onClick={this.handleExpandClick2}>Return Flight</Button>
                <Collapse in={this.state.expanded2} timeout="auto" unmountOnExit>
                <FlightCard flight={this.state.retFlight} reservation={this.props.reservation}></FlightCard>
                </Collapse>
                <br/>
                <styledTableRow>
                <StyledTableCell><Button color={"error"} onClick={this.handleOpen}>delete</Button></StyledTableCell>
                    <DeleteModal2 ReservationId={this.props.reservation._id} deleteFunc={this.props.deleteFunction} modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
                </styledTableRow>
        </Box>);
    }
}
export default Reservation;