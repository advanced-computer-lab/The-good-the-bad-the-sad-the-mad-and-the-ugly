import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Seats from '../SeatPicker'
import {useEffect, useState} from "react";
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Seats maxSeats={parseInt(props.seats.maxSeats)} availableSeats = {props.seats.availableSeats} reservedSeats = {props.seats.reservedSeats}/>
    </React.Fragment>
  );
}
