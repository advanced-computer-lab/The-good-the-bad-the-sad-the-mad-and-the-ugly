import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            FlightNumber: '',
            DepartureAirport: '',
            ArrivalAirport: '',
            Departure: '',
            Arrival: '',
            To: '',
            From: '',
            Economy: '',
            Business: '',
            First: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        console.log("hello");
        e.preventDefault();

        const data = {
            FlightNumber: this.state.FlightNumber,
            DepartureAirport: this.state.DepartureAirport,
            ArrivalAirport: this.state.ArrivalAirport,
            Departure: this.state.Departure,
            Arrival: this.state.Arrival,
            To: this.state.To,
            From: this.state.From,
            AvailableSeats: {
                Economy: this.state.Economy,
                Business: this.state.Business,
                First: this.state.First
            }
        };
        console.log(data);
        axios
            .post('http://localhost:8000/flight/', data)
            .then(res => {
                this.setState({
                    FlightNumber: '',
                    DepartureAirport: '',
                    ArrivalAirport: '',
                    Departure: '',
                    Arrival: '',
                    To: '',
                    From: '',
                    Economy: '',
                    Business: '',
                    First: ''
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
                                                    name='FlightNumber'
                                                    className='form-control'
                                                    value={this.state.FlightNumber}
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
                                                        name='From'
                                                        className='form-control'
                                                        value={this.state.From}
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
                                                        name='To'
                                                        className='form-control'
                                                        value={this.state.To}
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
                                                        name='DepartureAirport'
                                                        className='form-control'
                                                        value={this.state.DepartureAirport}
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
                                                        name='ArrivalAirport'
                                                        className='form-control'
                                                        value={this.state.ArrivalAirport}
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
                                                    name='Departure'
                                                    className='form-control'
                                                    value={this.state.Departure}
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
                                                    name='Arrival'
                                                    className='form-control'
                                                    value={this.state.Arrival}
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
                                                            name='Economy'
                                                            className='form-control'
                                                            value={this.state.Economy}
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
                                                            name='Business'
                                                            className='form-control'
                                                            value={this.state.Business}
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
                                                            name='First'
                                                            className='form-control'
                                                            value={this.state.First}
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



