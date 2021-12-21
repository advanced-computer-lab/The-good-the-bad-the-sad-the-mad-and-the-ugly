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


const ContactInfo = ({handleChange, values, prevStep, onSubmit}) => {

    const countryNameList = [];
    countryList().data.forEach(e => countryNameList.push(e));


    const Prev = e => {
        e.preventDefault();
        prevStep();
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
                        Contact Info
                    </Typography>
                    <React.Fragment>
                        <form onSubmit={onSubmit}>
                            <Box sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}} maxWidth="sm">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="mobileNumber"
                                            required
                                            fullWidth
                                            id="mobile"
                                            label="Mobile Number"
                                            type={"tel"}
                                            autoFocus
                                            onChange={handleChange('mobileNumber')}
                                            defaultValue={values.mobileNumber}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="homeAddress"
                                            required
                                            fullWidth
                                            id="homeAddress"
                                            label="Home Address"
                                            autoFocus
                                            onChange={handleChange('homeAddress')}
                                            defaultValue={values.homeAddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                    </Grid>
                                    <Grid item xs={12}>

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            onClick={prevStep}
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Previous
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                    </Grid>
                                </Grid>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Create Account
                            </Button>
                        </form>
                    </React.Fragment>
                </Box>

            </Paper>
        </Container>
    )
}

export default ContactInfo;

