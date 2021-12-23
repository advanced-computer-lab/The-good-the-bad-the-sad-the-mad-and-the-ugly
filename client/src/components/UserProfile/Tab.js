import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import UserProfile from "./UserProfile";
import {TabPanel} from "@mui/lab";
import UpdatePassword from "./UpdatePassword";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

export default function CustomizedTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
//k
    return (
        <Container component="main" maxWidth="sm" sx={{mb: 6, xs: 6, md: 4}}>
            <Grid container spacing={2} >
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Avatar
                        sx={{width: 70, height: 70}}
                    />
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>

            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Box sx={{bgcolor: '#fff'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="ant example">
                        <Tab label="Profile" value={0}/>
                        <Tab label="Update Password" value={1}/>
                    </Tabs>
                </Box>
                {value === 0 && <UserProfile/>}
                {value === 1 && <UpdatePassword/>}
            </Paper>
        </Container>
    );
}
