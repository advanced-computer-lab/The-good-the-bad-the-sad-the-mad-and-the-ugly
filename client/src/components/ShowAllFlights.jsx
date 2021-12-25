import React, {Component} from 'react';
import axios from 'axios';
import FlightHeading from './FlightHeading'
import Flight from './Flight'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Paper, Table, TableBody, TableContainer, Toolbar, Typography} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FlightDetails from "./Flights/FlightDetails";
import {palette} from '@mui/system';
import Container from "@mui/material/Container";


class ShowAllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            // expanded: false
        };
        this.deleteFlight = this.deleteFlight.bind(this)
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/flight/showAllFlights')
            .then(res => {
                this.setState({
                    flights: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    };

    deleteFlight(event) {
        axios
            .delete('http://localhost:8000/flight/delete/' + event.target.name)
            .then(res => {
                let flightRemoved = res.data;
                let newFlights = [];
                this.state.flights.forEach(function (item) {
                    if (item._id !== flightRemoved._id)
                        newFlights.push(item);
                })
                this.setState({
                    flights: newFlights
                })
            })
    }



    // const handleChange = (panel) => (event, isExpanded) => {
    //     if (isExpanded){
    //         this.setState({
    //            isExpanded: panel
    //         });
    //     }
    //     else {
    //         this.setState({
    //             isExpanded: false
    //         });
    //     }
    //
    // };

    render() {
        const theme = createTheme();
        const flights = this.state.flights;
        let flightList;

        console.log(flights[1])

        if (!flights) {
            flightList = "there is no flight record!";
        } else {
            flightList = flights.map((flight, k) =>
                <FlightDetails flight={flight} idx={k} key={k} deleteFunction={this.deleteFlight}/>
            );
        }
        console.log(flightList)

        return (

                // <div>
                //     <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                //         <AccordionSummary
                //             expandIcon={<ExpandMoreIcon />}
                //             aria-controls="panel1bh-content"
                //             id="panel1bh-header"
                //         >
                //             <Typography sx={{ width: '33%', flexShrink: 0 }}>
                //                 General settings
                //             </Typography>
                //             <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                //         </AccordionSummary>
                //         <AccordionDetails>
                //             <Typography>
                //                 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                //                 Aliquam eget maximus est, id dignissim quam.
                //             </Typography>
                //         </AccordionDetails>
                //     </Accordion>
                //     <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                //         <AccordionSummary
                //             expandIcon={<ExpandMoreIcon />}
                //             aria-controls="panel2bh-content"
                //             id="panel2bh-header"
                //         >
                //             <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                //             <Typography sx={{ color: 'text.secondary' }}>
                //                 You are currently not an owner
                //             </Typography>
                //         </AccordionSummary>
                //         <AccordionDetails>
                //             <Typography>
                //                 Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                //                 varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                //                 laoreet.
                //             </Typography>
                //         </AccordionDetails>
                //     </Accordion>
                //     <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                //         <AccordionSummary
                //             expandIcon={<ExpandMoreIcon />}
                //             aria-controls="panel3bh-content"
                //             id="panel3bh-header"
                //         >
                //             <Typography sx={{ width: '33%', flexShrink: 0 }}>
                //                 Advanced settings
                //             </Typography>
                //             <Typography sx={{ color: 'text.secondary' }}>
                //                 Filtering has been entirely disabled for whole web server
                //             </Typography>
                //         </AccordionSummary>
                //         <AccordionDetails>
                //             <Typography>
                //                 Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                //                 amet egestas eros, vitae egestas augue. Duis vel est augue.
                //             </Typography>
                //         </AccordionDetails>
                //     </Accordion>
                //     <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                //         <AccordionSummary
                //             expandIcon={<ExpandMoreIcon />}
                //             aria-controls="panel4bh-content"
                //             id="panel4bh-header"
                //         >
                //             <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
                //         </AccordionSummary>
                //         <AccordionDetails>
                //             <Typography>
                //                 Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                //                 amet egestas eros, vitae egestas augue. Duis vel est augue.
                //             </Typography>
                //         </AccordionDetails>
                //     </Accordion>
                // </div>

            <div>

                <Container component="main" maxWidth="md" sx={{mb: 4}}>
                    {flightList}
                </Container>
            </div>
        );
    }
}

export default ShowAllFlights;