import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import background from '../Img/Flight3.jpeg'
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const theme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const [isValidUser, setValidUser] = useState(true);


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#121212',
            },
        },
    });

    useEffect(() => {
        axios.get('http://localhost:8000/login/authorize')
            .then(
                res => {
                    if (res.data.success){
                        navigate('/userShowFlights')
                    }
                }
            )
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const info = {username: data.get('username'), password: data.get('password')};
        axios.post('http://localhost:8000/login', info)
            .then(res => {
                if (!res.data.success) {
                    setValidUser(false);
                } else {
                    setValidUser(true);
                    navigate('/home');
                }
            }).catch(res => {
            console.log(res)
            });

    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember"/>}
                                label="Remember me"
                            />
                            {(!isValidUser) && <Alert severity="error"> Invalid Email or Password </Alert>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                login
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link href="http://localhost:3000/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}