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


const BasicInfo = ({nextStep, handleChange, values, prevStep}) => {

    const countryNameList = []
    countryList().data.forEach(e => countryNameList.push(e.label));


    const Next = e => {
        e.preventDefault();
        nextStep();
    }

    const Prev = e => {
        e.preventDefault();
        prevStep();
    }

    const handleCountry = (e, v) => {
        values.country = v;
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
                        Basic Info
                    </Typography>

                    <form onSubmit={Next}>
                        <Box sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}} maxWidth="sm">
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
                                        defaultValue={values.firstName}
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
                                        defaultValue={values.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={countryNameList}
                                        required
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Country"/>}
                                        onChange={handleCountry}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="passport"
                                        required
                                        fullWidth
                                        id="passport"
                                        label="Passport Number"
                                        autoFocus
                                        defaultValue={values.passportNumber}
                                        onChange={handleChange('passportNumber')}
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        onClick={Prev}
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Previous
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
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

export default BasicInfo;

