
import React, { Component } from 'react';
import axios from 'axios';


class ShowFlights extends Component {

    constructor() {

        super();

        this.state = {
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            from: '',
            to: '',
            departure: null,
            arrival: null,
            economy: null,
            business: null,
            first: null
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
            departure: this.state.departure,
            arrival: this.state.arrival,
            availableSeats: {
                economy: parseInt(this.state.economy),
                business: parseInt(this.state.business),
                first: parseInt(this.state.first),
            }
        };

        axios
            .post('http://localhost:8082/flight/showFlights', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    departureAirport: '',
                    arrivalAirport: '',
                    from: '',
                    to: '',
                    departure: '',
                    arrival: '',
                    economy: null,
                    business: null,
                    first: null
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in Search Flights!");
            })
    };

    render() {
        return (
            <div className="col-md-8 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Flight Number'
                            Name='flightNumber'
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
                            Name='departureAirport'
                            className='form-control'
                            value={this.state.departureAirport}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Arrival Airport'
                            Name='arrivalAirport'
                            className='form-control'
                            value={this.state.arrivalAirport}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='From'
                            Name='from'
                            className='form-control'
                            value={this.state.from}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='To'
                            Name='to'
                            className='form-control'
                            value={this.state.to}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='Date'
                            placeholder='Departure'
                            Name='departure'
                            className='form-control'
                            value={this.state.departure}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='Date'
                            placeholder='Arrival'
                            Name='arrival'
                            className='form-control'
                            value={this.state.arrival}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='number'
                            placeholder='Economy Seats'
                            Name='economy'
                            className='form-control'
                            value={this.state.economy}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='number'
                            placeholder='Business Seats'
                            Name='business'
                            className='form-control'
                            value={this.state.business}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='number'
                            placeholder='First Class Seats'
                            Name='first'
                            className='form-control'
                            value={this.state.first}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit">View Flights</button>
                </form>
            </div>
        );
    }
}

export default ShowFlights;