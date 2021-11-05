import React, { Component } from 'react';
import axios from 'axios';
import FlightHeading from './FlightHeading'
import Flight from './Flight'

class ShowAllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/flight/showAllFlights')
            .then(res => {
                this.setState({
                    flights: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    };


    render() {
        const flights = this.state.flights;
        console.log("Flights: " + flights);
    let flightList;

    if(!flights) {
      flightList = "there is no flight record!";
    } else {
      flightList = flights.map((flight, k) =>
        <Flight flight={flight} idx={k} key={k} />
      );
    }

        return (
            <div>
                        <table className="table table-hover">

                <FlightHeading />
                <tbody>
                {flightList}
                </tbody>
                </table>

            </div>
        );
    }
}

export default ShowAllFlights;