import React, {useState} from 'react'
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    CssBaseline,
    Paper, useMediaQuery, MuiThemeProvider
} from '@material-ui/core'
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Alert} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";


const AccountInfo = ({nextStep, handleChange, values}) => {


    const Next = e => {

        e.preventDefault();
        if (values.isMatch && !values.isUserNameRepeated)
            nextStep();
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <Container component="main" maxWidth="sm">
            <Paper variant="outlined">
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{m: 1}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Account Info
                    </Typography>

                    <form onSubmit={Next}>

                        <Box sx={{my: {xs: 12, md: 6}, p: {xs: 12, md: 3}}} maxWidth="lg">


                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        sm={400}
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        onChange={handleChange('username')}
                                        defaultValue={values.username}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        type={"email"}
                                        autoComplete="email"
                                        onChange={handleChange('email')}
                                        defaultValue={values.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange('password')}
                                        defaultValue={values.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        defaultValue={values.confirmPassword}
                                        onChange={handleChange('confirmPassword')}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    {!values.isMatch && (<Alert severity={'error'} variant={"outlined"}>
                                        <strong style={{color: 'red'}}>Password is Mismatch!</strong>
                                    </Alert>)}
                                </Grid>
                                <Grid item xs={12}>
                                    {values.isUserNameRepeated && (<Alert severity={'error'} variant={"outlined"}>
                                        <strong>Username is already used!!</strong>
                                    </Alert>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant={"outlined"}
                                    >
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </form>
                </Box>
            </Paper>
        </Container>

    )
}

export default AccountInfo;

