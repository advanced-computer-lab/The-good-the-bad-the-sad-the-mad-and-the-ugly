import React, { Component } from 'react';
import axios from 'axios';


class Test extends Component {
    constructor() {

        super();

        this.state = {
            flights: []
        };

    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/flights/showFlights')
            .then(res => {
                console.log(res);
                this.setState({
                    flights:[]
                })
            })
            .catch(err => {
                console.log('Error in Showing Flights');
            })
    };


    render() {
        const data = this.state.flights;
        console.log("Flights: " + data);

        return (
            <div>
                {data}
            </div>
        );
    }
}

export default Test;