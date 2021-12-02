import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import {Component} from "react";
import AccountInfo from "./AccountInfo";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import axios from "axios";

const steps = ['Account', 'Personal', 'Contact'];

export default class SignUp extends Component {


    state = {
        curStep: 0,
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        isMatch: true,
        firstName: '',
        lastName: '',
        country: '',
        passportNumber: '',
        homeAddress: '',
        mobileNumber: '',
        usernameList: [],
        isUserNameRepeated: false
    }


    isActive = (idx) => {
        return idx < this.state.curStep;
    }

    prevStep = () => {
        let {curStep} = this.state;
        this.setState({curStep: curStep - 1});
    }

    nextStep = () => {

        let {curStep} = this.state;
        this.setState({curStep: curStep + 1});
    }

    handleChange = input => async e => {
        await this.setState({[input]: e.target.value});
        if (input === 'confirmPassword' || input === 'password') {
            this.setState({'isMatch': this.state.confirmPassword === this.state.password});
        }
        if (input === 'username')
            this.setState({isUserNameRepeated: this.state.usernameList.includes(this.state.username)});
    }

    onSubmit = () => {
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            passportNumber: this.state.passportNumber,
            homeAddress: this.state.homeAddress,
            mobileNumber: this.state.mobileNumber
        }

        axios.post('http://localhost:8000/register', data)
            .then((r) => {
                this.state = {
                    curStep: 0,
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    isMatch: true,
                    firstName: '',
                    lastName: '',
                    country: '',
                    passportNumber: '',
                    homeAddress: '',
                    mobileNumber: ''
                }
                // this.props.history.push('/login');
            }).catch(err => console.log(err))
    }


    render() {

        if (this.state.usernameList.length === 0) {
            axios.get('http://localhost:8000/register/usernames')
                .then(data => {
                    data.data.forEach(e => this.state.usernameList.push(e.username));
                })
                .catch(err => console.log(err));
        }

        const {curStep} = this.state;
        const {
            email, username, password, confirmPassword,
            firstName, lastName, country,
            passportNumber, homeAddress, mobileNumber, usernameList
        } = this.state;
        const values = {
            email, username, password, confirmPassword,
            firstName, lastName, country,
            passportNumber, homeAddress, mobileNumber, usernameList
        }

        const stepper = (<Stepper nonLinear alternativeLabel activeStep={curStep}>
            {steps.map((label, index) => (
                <Step key={label} completed={this.isActive(index)}>
                    <StepButton color="inherit">
                        {label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>);

        const accountInfo = (
            <AccountInfo values={this.state} handleChange={this.handleChange} nextStep={this.nextStep}/>);
        const basicInfo = (<BasicInfo values={this.state} handleChange={this.handleChange} nextStep={this.nextStep}
                                      prevStep={this.prevStep}/>);
        const contactInfo = (<ContactInfo values={this.state} handleChange={this.handleChange} prevStep={this.prevStep}
                                          onSubmit={this.onSubmit}/>);
        return (
            <Box sx={{width: '95%', marginTop: 8}}>
                {stepper}
                {curStep === 0 ? accountInfo : curStep === 1 ? basicInfo : contactInfo}
            </Box>
        );
    }
}
