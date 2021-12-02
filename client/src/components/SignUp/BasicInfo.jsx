import React from 'react'
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
import {Autocomplete} from "@mui/material";
import countryList from 'react-select-country-list'



const BasicInfo = ({nextStep, handleChange, values}) => {


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


                    <Box component="form" noValidate
                         sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}} maxWidth="sm">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="lastName"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    autoFocus
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                                <Autocomplete   options={countryList().data} renderInput={}/>
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    onClick={Next}
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

                </Box>
            </Paper>
        </Container>
    )
}

export default BasicInfo;

