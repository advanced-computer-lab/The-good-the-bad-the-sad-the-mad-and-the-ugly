import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Component} from "react";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./BasicInfo";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";

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
        mobileNumber: ''
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
    }

    onSubmit = () =>{

    }


    render() {
        const {curStep} = this.state;
        const {email, username, password, firstName, lastName, country, levelOfEducation} = this.state;
        const values = {email, username, password, firstName, lastName, country, levelOfEducation}

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
        const basicInfo = (<BasicInfo values={values} handleChange={this.handleChange} nextStep={this.nextStep} prevStep={this.prevStep}/>);
        const contactInfo = (<ContactInfo values={values} handleChange={this.handleChange} prevStep={this.prevStep} onSubmit={this.onSubmit}/>);
        return (
            <Box sx={{width: '95%', marginTop: 8}}>
                {stepper}
                {curStep === 0 ? accountInfo : curStep === 1 ? basicInfo : contactInfo}
            </Box>
        );
    }
}
