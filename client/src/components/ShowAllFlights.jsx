import React, {Component} from 'react';
import axios from 'axios';
import FlightHeading from './FlightHeading'
import Flight from './Flight'
import DeleteModal from "./DeleteModal";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";

class ShowAllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        };
        this.deleteFlight = this.deleteFlight.bind(this)
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/flight/showAllFlights')
            .then(res => {
                this.setState({
                    flights: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    };

    deleteFlight(event) {
        axios
            .delete('http://localhost:8000/flight/delete/' + event.target.name)
            .then(res => {
                let flightRemoved = res.data;
                let newFlights = [];
                this.state.flights.forEach(function (item) {
                    if (item._id !== flightRemoved._id)
                        newFlights.push(item);
                })
                this.setState({
                    flights: newFlights
                })
            })
    }

    render() {
        const flights = this.state.flights;
        let flightList;

        if (!flights) {
            flightList = "there is no flight record!";
        } else {
            flightList = flights.map((flight, k) =>
                <Flight flight={flight} idx={k} key={k} deleteFunction={this.deleteFlight}/>
            );
        }

        return (
            <div>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} className="table table-hover">
                    <FlightHeading/>
                    <TableBody>
                    {flightList}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ShowAllFlights;