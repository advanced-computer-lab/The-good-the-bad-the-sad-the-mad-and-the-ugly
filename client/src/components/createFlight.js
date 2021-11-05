import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            flightNumber: '',
            departure: '',
            arrival: '',
            date: '',
            economySeats: '',
            businessSeats: '',
            airport: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        console.log("hello");
        e.preventDefault();

        const data = {
            flightNumber: this.state.flightNumber,
            departure: this.state.departure,
            arrival: this.state.arrival,
            date: this.state.departure,
            economySeats: this.state.economySeats,
            businessSeats: this.state.businessSeats,
            airport: this.state.airport
        };
        console.log(data);
        axios
            .post('http://localhost:8082/flight/', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    departure: '',
                    arrival: '',
                    date: '',
                    economySeats: '',
                    businessSeats: '',
                    airport: ''
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
                                        <small>  enter valid information</small>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Flight number</label>
                                                    <input
                                                        type='number'
                                                        placeholder='Number of the flight'
                                                        name='flightNumber'
                                                        className='form-control'
                                                        value={this.state.flightNumber}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Airport</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Departure Airport'
                                                        name='airport'
                                                        className='form-control'
                                                        value={this.state.airport}
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
                                                    placeholder='Departure time'
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
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="eco">Economy seats</label>
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            placeholder='Number of Economy seats'
                                                            name='economySeats'
                                                            className='form-control'
                                                            value={this.state.economySeats}
                                                            onChange={this.onChange}
                                                            id="eco"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Business seats</label>
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            placeholder='Number of Business seats'
                                                            name='businessSeats'
                                                            className='form-control'
                                                            value={this.state.businessSeats}
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



