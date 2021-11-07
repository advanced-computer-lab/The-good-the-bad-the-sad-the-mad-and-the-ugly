import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            departure: '',
            arrival: '',
            to: '',
            from: '',
            economy: '',
            business: '',
            first: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            flightNumber: this.state.flightNumber,
            departureAirport: this.state.departureAirport,
            arrivalAirport: this.state.arrivalAirport,
            departure: this.state.departure,
            arrival: this.state.arrival,
            to: this.state.to,
            from: this.state.from,
            availableSeats: {
                economy: this.state.economy,
                business: this.state.business,
                first: this.state.first
            }
        };
        console.log(data);
        axios
            .post('http://localhost:8000/flight/', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    departureAirport: '',
                    arrivalAirport: '',
                    departure: '',
                    arrival: '',
                    to: '',
                    from: '',
                    economy: '',
                    business: '',
                    first: ''
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-8 m-auto">*/}
                    {/*        <br />*/}
                    {/*        /!*<Link to="/" className="btn btn-outline-warning float-left">*!/*/}
                    {/*        /!*    Show flight List*!/*/}
                    {/*        /!*</Link>*!/*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-8 m-auto">*/}
                    <h1 className="display-4 text-center">Add Flight</h1>
                    {/*<p className="lead text-center">*/}
                    {/*    Create new flight*/}
                    {/*</p>*/}

                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-2"></div>

                            <div className="col-8">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Flight</strong>
                                        <small> enter valid information</small>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label className="col-3 col-form-label">Flight Number</label>
                                            <div className="col-9">
                                                <input
                                                    type='text'
                                                    placeholder='Number of the flight'
                                                    name='flightNumber'
                                                    className='form-control'
                                                    value={this.state.flightNumber}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>From</label>
                                                    <input
                                                        type='text'
                                                        placeholder='City'
                                                        name='from'
                                                        className='form-control'
                                                        value={this.state.from}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>To</label>
                                                    <input
                                                        type='text'
                                                        placeholder='City'
                                                        name='to'
                                                        className='form-control'
                                                        value={this.state.to}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Departure Airport</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Departure Airport'
                                                        name='departureAirport'
                                                        className='form-control'
                                                        value={this.state.departureAirport}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Arrival Airport</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Arrival Airport'
                                                        name='arrivalAirport'
                                                        className='form-control'
                                                        value={this.state.arrivalAirport}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-2 col-form-label">Departure</label>
                                            <div className="col-10">
                                                <input
                                                    type='datetime-local'
                                                    placeholder='Departure Date'
                                                    name='departure'
                                                    className='form-control'
                                                    value={this.state.departure}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label className="col-2 col-form-label">Arrival</label>
                                            <div className="col-10">
                                                <input
                                                    type='datetime-local'
                                                    placeholder='Arrival time'
                                                    name='arrival'
                                                    className='form-control'
                                                    value={this.state.arrival}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="eco">Economy</label>
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            placeholder='Economy Seats'
                                                            name='economy'
                                                            className='form-control'
                                                            value={this.state.economy}
                                                            onChange={this.onChange}
                                                            id="eco"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label>Business</label>
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            placeholder='Business Seats'
                                                            name='business'
                                                            className='form-control'
                                                            value={this.state.business}
                                                            onChange={this.onChange}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label>First Class</label>
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            placeholder='First Class Seats'
                                                            name='first'
                                                            className='form-control'
                                                            value={this.state.first}
                                                            onChange={this.onChange}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit"
                                                className="btn btn-sm btn-success float-right">submit
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default CreateFlight;



