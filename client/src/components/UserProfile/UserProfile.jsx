import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {LocalizationProvider, MobileDateTimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Avatar from "@mui/material/Avatar";
import {Helmet} from 'react-helmet';
import {useNavigate} from "react-router-dom";


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#121212',
        },
    },
});

export default function UserProfile() {
    const navigate = useNavigate();
    const [isDisabled, setDisable] = useState(true);
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        passportNumber: '',
        homeAddress: '',
        mobileNumber: '',
    });

    useEffect(() => {
        axios.get('http://localhost:8000/login/authorize')
            .then(
                res => {
                    if (res.data.success){
                        axios.get('http://localhost:8000/profile')
                            .then(res => {
                                const data = res.data.result[0];
                                setUserData({
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    country: data.country,
                                    passportNumber: data.passportNumber,
                                    homeAddress: data.homeAddress,
                                    mobileNumber: data.mobileNumber
                                });
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else {
                        navigate('/login');
                    }
                }
            )

    }, []);


    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name + " " + value);

        setUserData((prevState => {
            console.log({
                ...prevState,
                [name]: value
            });
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/profile/editProfile', userData)
            .then(res => {
                console.log(res);
                setDisable(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>

                    <Container component="main" maxWidth="sm" sx={{mb: 4}}>


                            <Grid container spacing={2}>
                                <Grid item xs={8}>

                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={() => setDisable(false)}>Edit</Button>
                                </Grid></Grid>

                            <React.Fragment>
                                <form onSubmit={onSubmit}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="standard" fullWidth label="First Name"
                                                    disabled={isDisabled}
                                                    value={userData.firstName}
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth label="Last Name"
                                                    name="lastName"
                                                    variant="standard"
                                                    value={userData.lastName}
                                                    onChange={handleChange}
                                                    disabled={isDisabled}
                                                    required
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField fullWidth label="Email"
                                                           name="email"
                                                           variant="standard"
                                                           type={'email'}
                                                           onChange={handleChange}
                                                           value={userData.email}
                                                           disabled={isDisabled}
                                                           required
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField fullWidth label="Passport Number"
                                                           name="passportNumber"
                                                           variant="standard"
                                                           onChange={handleChange}
                                                           required
                                                           value={userData.passportNumber}
                                                           disabled={isDisabled}
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Mobile Number"
                                                           name="mobileNumber"
                                                           required
                                                           onChange={handleChange}
                                                           variant="standard"
                                                           value={userData.mobileNumber}
                                                           disabled={isDisabled}
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Country"
                                                           required
                                                           name="country"
                                                           variant="standard"
                                                           onChange={handleChange}
                                                           value={userData.country}
                                                           disabled={isDisabled}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField fullWidth label="Home Address"
                                                           name="homeAddress"
                                                           variant="standard"
                                                           value={userData.homeAddress}
                                                           required
                                                           onChange={handleChange}
                                                           disabled={isDisabled}
                                                />
                                            </Grid>

                                        </Grid>

                                    </LocalizationProvider>

                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{mt: 3, ml: 1}}
                                            disabled={isDisabled}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </React.Fragment>

                    </Container>
        </div>
    );
}
