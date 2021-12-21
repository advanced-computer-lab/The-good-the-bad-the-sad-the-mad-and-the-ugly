import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from "@mui/material/Container";
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";
import {Alert} from "@mui/material";


export default function UpdatePassword() {

    const [passwords, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const [confirmPassword, setConfirmPass] = useState('');
    const [isPassMatching, setPassMatch] = useState(true);
    const [isOldPassMatch, setOldPassMatch] = useState(true);
    const [isUpdated, setUpdated] = useState(false);
    const [isBuffering, setBuffering] = useState(false);

    const onSubmit = () => {
        if (isPassMatching && passwords.oldPassword !== '' && passwords.newPassword !== '' && confirmPassword !== '') {
            const {oldPassword, newPassword} = passwords;

            setBuffering(true);
            axios.post('http://localhost:8000/profile/updatePassword', {oldPassword, newPassword})
                .then(r => {
                    if (r.data.success) {
                        setUpdated(true);
                    } else {
                        setOldPassMatch(false);
                    }
                    setBuffering(false);
                });

        }
    };


    useEffect(()=> {
        setPassMatch(confirmPassword === passwords.newPassword);
    },[confirmPassword]);

    async function handleChange (event)  {
        const {name, value} = event.target;

        setUpdated(false);
        setOldPassMatch(true);
        if(name === 'confirmPassword')
            setConfirmPass(value);
        else await setPassword((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                };
        });
    }

    return (
        <div>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                            onChange={handleChange}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="New Password"
                            name="newPassword"
                            type="password"
                            onChange={handleChange}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            required
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>

                    <Grid item xs={8} sm={8}>
                        {isBuffering && < CircularProgress/>}
                    </Grid>
                    <Grid item xs={12}>
                        {!isPassMatching && (<Alert severity={'error'} variant={"outlined"}>
                            <strong>Passwords are Mismatch!!</strong>
                        </Alert>)}
                    </Grid>
                    <Grid item xs={12}>
                        {!isOldPassMatch && (<Alert severity={'error'} variant={"outlined"}>
                            <strong>Old Password is Wrong!!</strong>
                        </Alert>)}
                    </Grid>
                    <Grid item xs={12}>
                        {isUpdated && (<Alert severity={'success'} variant={"outlined"}>
                            <strong>Password is Updated Successfully</strong>
                        </Alert>)}
                    </Grid>


                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} sm={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                        >
                            Update Password
                        </Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Container>
        </div>
    );


};