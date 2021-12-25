import React, {useState, useEffect} from 'react';
import {Box, Grid, CardHeader, Card, TextField, Button} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {MobileDateTimePicker} from "@mui/lab";
import {useParams} from "react-router-dom";
import axios from "axios";
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import Divider from "@mui/material/Divider";


function UpdateFlight() {
    let params = useParams();

    const [flightData, setFlight] = useState({
        id: "",
        flightNumber: "",
        departureAirport: "",
        arrivalAirport: "",
        from: "",
        to: "",
        departure: "",
        arrival: "",
        economy: "",
        business: "",
        first: "",
        arrivalTerminal: '',
        departureTerminal: '',
        economyPriceAdult: '',
        businessPriceAdult: '',
        firstPriceAdult: '',
        economyPriceChild: '',
        businessPriceChild: '',
        firstPriceChild: '',
        baggageAllowance: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/flight/getFlightById/${params.id}`)
            .then(res => {
                setFlight({
                    id: res.data._id,
                    flightNumber: res.data.flightNumber,
                    departureAirport: res.data.departureAirport,
                    arrivalAirport: res.data.arrivalAirport,
                    from: res.data.from,
                    to: res.data.to,
                    departure: res.data.departure,
                    arrival: res.data.arrival,
                    economy: res.data.availableSeats.economy,
                    business: res.data.availableSeats.business,
                    first: res.data.availableSeats.first,
                    arrivalTerminal: res.data.arrivalTerminal,
                    departureTerminal: res.data.departureTerminal,
                    economyPriceAdult: res.data.price.economy.adult,
                    businessPriceAdult: res.data.price.business.adult,
                    firstPriceAdult: res.data.price.first.adult,
                    economyPriceChild: res.data.price.economy.child,
                    businessPriceChild: res.data.price.business.child,
                    firstPriceChild: res.data.price.first.child,
                    baggageAllowance: res.data.baggageAllowance
                });
            })
            .catch(
                err => {
                    console.log(err);
                }
            );
    }, [flightData.id]);

    function updateFlight() {
        const data = {
            flightNumber: flightData.flightNumber,
            departureAirport: flightData.departureAirport,
            arrivalAirport: flightData.arrivalAirport,
            from: flightData.from,
            to: flightData.to,
            departure: flightData.departure,
            arrival: flightData.arrival,
            maxSeats: {
                economy: flightData.economy,
                business: flightData.business,
                first: flightData.first
            },
            price: {
                economy:{
                    adult: flightData.economyPriceAdult,
                    child: flightData.economyPriceChild
                },
                business: {
                    adult: flightData.businessPriceAdult,
                    child: flightData.businessPriceChild
                },
                first: {
                    adult: flightData.firstPriceAdult,
                    child: flightData.firstPriceChild
                }
            },
            baggageAllowance: flightData.baggageAllowance,
            departureTerminal: flightData.departureTerminal,
            arrivalTerminal: flightData.arrivalTerminal
        };
        axios.put(`http://localhost:8000/flight/updateFlight/${params.id}`, data);
    }

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(name + " " + value);
        setFlight((prevState => {
            console.log({
                ...prevState,
                [name]: value
            });
            return {
                ...prevState,
                [name]: value
            };
        }));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card sx={{
                width: 1000,

                // backgroundColor: 'primary.light',
                // color: 'primary.main',
                boxShadow: 7,
                borderRadius: 3,
                mx: 'auto',
                mt: 10,
                px: 0,
                py: 0
            }}>
                <CardHeader sx={
                    {
                        // backgroundColor: 'primary.dark',
                        // color: 'primary.contrastText',
                        boxShadow: 5,
                        height: "15%",
                    }
                } title={<h3>Update Flight Info</h3>}/>
                <form onSubmit={updateFlight}>
                    <Box sx={
                        {
                            p: 3,
                            height: "70%"
                        }
                    }>
                        <Grid container rowSpacing={3} columnSpacing={2}>
                            <Grid item xs={6}>
                                <TextField sx={{width: 350}} label="Flight Number" value={flightData.flightNumber}
                                           onChange={handleChange} name="flightNumber"/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField sx={{width: 200}} label="From" value={flightData.from}
                                           onChange={handleChange}
                                           name="from"/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField sx={{width: 200}} label="To" value={flightData.to} onChange={handleChange}
                                           name="to"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField sx={{width: 350}} label="Departure Airport"
                                           value={flightData.departureAirport}
                                           name="departureAirport" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField sx={{width: 350}} label="Arrival Airport" value={flightData.arrivalAirport}
                                           name="arrivalAirport" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MobileDateTimePicker value={parseISO(flightData.departure)} onChange={
                                    (newDate) => {
                                        setFlight((prevState => {
                                            return {
                                                ...prevState,
                                                "departure": formatISO(newDate)
                                            }
                                        }))
                                    }
                                }
                                                      renderInput={(props) => <TextField disabled name="departure"
                                                                                         sx={{width: 350}} {...props} />}
                                                      label="Departure Date"/>

                            </Grid>
                            <Grid item xs={6}>
                                <MobileDateTimePicker value={parseISO(flightData.arrival)} onChange={(newDate) => {
                                    setFlight((prevState => {
                                        return {
                                            ...prevState,
                                            "arrival": formatISO(newDate)
                                        }
                                    }))
                                }}
                                                      renderInput={(props) => <TextField disabled name="arrival"
                                                                                         sx={{width: 350}} {...props} />}
                                                      label="Arrival Date"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>Number of seats</Divider>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Economy"
                                           name={"economy"} onChange={handleChange}
                                           value={flightData.economy}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Business"
                                           name={"business"} onChange={handleChange}
                                           value={flightData.business}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="First Class"
                                           name={"first"} onChange={handleChange}
                                           value={flightData.first}/>
                            </Grid>


                            <Grid item xs={12}>
                                <Divider>Price</Divider>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Economy Price for Adult"
                                           name={"economyPriceAdult"} onChange={handleChange}
                                           value={flightData.economyPriceAdult}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Business Price for Adult"
                                           name={"businessPriceAdult"} onChange={handleChange}
                                           value={flightData.businessPriceAdult}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="First Class Price for Adult"
                                           name={"firstPriceAdult"} onChange={handleChange}
                                           value={flightData.firstPriceAdult}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Economy Price for Child"
                                           name={"economyPriceChild"} onChange={handleChange}
                                           value={flightData.economyPriceChild}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="Business Price for Child"
                                           name={"businessPriceChild"} onChange={handleChange}
                                           value={flightData.businessPriceChild}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type={"number"} sx={{width: 250}} label="First Class Price for Child"
                                           name={"firstPriceChild"} onChange={handleChange}
                                           value={flightData.firstPriceChild}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider>Other Info</Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={"number"} sx={{width: 450}} label="Departure Terminal"
                                           name={"departureTerminal"} onChange={handleChange}
                                           value={flightData.departureTerminal}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={"number"} sx={{width: 450}} label="Arrival Terminal"
                                           name={"arrivalTerminal"} onChange={handleChange}
                                           value={flightData.arrivalTerminal}/>
                            </Grid>
                            <Grid item xs={4}> </Grid>
                            <Grid item xs={8}>
                                <TextField type={"number"} sx={{width: 250}} label="Baggage Allowance"
                                           name={"baggageAllowance"} onChange={handleChange}
                                           value={flightData.baggageAllowance}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <CardHeader sx={{
                        // backgroundColor: 'primary.dark',
                        // color: 'primary.contrastText',
                        boxShadow: 5,
                        height: "15%",
                    }} title={
                        <Button type={"submit"} variant={"contained"} color={"success"}>SUBMIT</Button>
                    }/>
                </form>
            </Card>
        </LocalizationProvider>
    );
}

export default UpdateFlight;

