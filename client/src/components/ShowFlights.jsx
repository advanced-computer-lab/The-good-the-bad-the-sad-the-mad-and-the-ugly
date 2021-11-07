
import React, { Component } from 'react';
import axios from 'axios';
import Flight from './Flight'
import FlightHeading from './FlightHeading';

class ShowFlights extends Component {

    constructor() {

        super();

        this.state = {
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            from: '',
            to: '',
            departure1: '',
            departure2: '',
            arrival1: '',
            arrival2: '',
            economy: '',
            business: '',
            first: '',
            flights: []
        };

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            flightNumber: this.state.flightNumber,
            departureAirport: this.state.departureAirport,
            arrivalAirport: this.state.arrivalAirport,
            from: this.state.from,
            to: this.state.to,
            departure1: this.state.departure1,
            departure2: this.state.departure2,
            arrival1: this.state.arrival1,
            arrival2: this.state.arrival2,
            availableSeats: {
                economy: parseInt(this.state.economy),
                business: parseInt(this.state.business),
                first: parseInt(this.state.first),
            }
        };


        axios
            .post('http://localhost:8000/flight/showFlights', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    departureAirport: '',
                    arrivalAirport: '',
                    from: '',
                    to: '',
                    departure1: '',
                    departure2: '',
                    arrival1: '',
                    arrival2: '',
                    economy: '',
                    business: '',
                    first: '',
                    flights: res.data
                })

            })
            .catch(err => {
                console.log("Error in Show Flights POST \n", err);
            })
    };

    render() {
        let flights = this.state.flights;
        let flightList;
        if (!flights) {
            flightList = "there is no flight record!";
        } else {
            flightList = flights.map((flight, k) =>
                <Flight flight={flight} idx={k} key={k} />
            );
        }

        return (
            <div className="big">
                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Flight Number'
                                name='flightNumber'
                                className='form-control'
                                value={this.state.flightNumber}
                                onChange={this.onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Departure Airport'
                                name='departureAirport'
                                className='form-control'
                                value={this.state.departureAirport}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Arrival Airport'
                                name='arrivalAirport'
                                className='form-control'
                                value={this.state.arrivalAirport}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='From'
                                name='from'
                                className='form-control'
                                value={this.state.from}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='To'
                                name='to'
                                className='form-control'
                                value={this.state.to}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='Date'
                                placeholder='Departure1'
                                name='departure1'
                                className='form-control'
                                value={this.state.departure1}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='Date'
                                placeholder='Departure2'
                                name='departure2'
                                className='form-control'
                                value={this.state.departure2}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='Date'
                                placeholder='Arrival1'
                                name='arrival1'
                                className='form-control'
                                value={this.state.arrival1}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='Date'
                                placeholder='Arrival2'
                                name='arrival2'
                                className='form-control'
                                value={this.state.arrival2}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='number'
                                placeholder='Economy Seats'
                                name='economy'
                                className='form-control'
                                value={this.state.economy}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='number'
                                placeholder='Business Seats'
                                name='business'
                                className='form-control'
                                value={this.state.business}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='number'
                                placeholder='First Class Seats'
                                name='first'
                                className='form-control'
                                value={this.state.first}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit">View Flights</button>
                    </form>
                </div>
                <div className='container' style={{marginTop:"50px"}}>
                    <table className="table table-hover">
                        <FlightHeading />
                        <tbody>
                            {flightList}
                        </tbody>
                    </table>

                </div>
            </div>
        );

    }
}

export default ShowFlights;