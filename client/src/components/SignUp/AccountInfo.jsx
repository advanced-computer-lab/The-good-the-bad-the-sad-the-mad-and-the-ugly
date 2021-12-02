import React, {useState} from 'react'
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox, Paper, makeStyles, Card
} from '@material-ui/core'
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Alert, AlertTitle} from "@mui/material";


const AccountInfo = ({nextStep, handleChange, values}) => {


    const Next = e => {
        e.preventDefault();
        nextStep();
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Account Info
                    </Typography>

                    <form onSubmit={Next}>
                        <Box
                            sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}} maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        fullWidth
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
                                        <strong>Password is Mismatch!</strong>
                                    </Alert>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
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

