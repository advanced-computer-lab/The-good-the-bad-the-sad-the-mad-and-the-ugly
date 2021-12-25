import React from 'react';
import {useParams} from "react-router-dom";
import UserEditFlight from './UserEditFlight';

function Helper() {

    const  params  = useParams();

    return (
        <div>
            <UserEditFlight from={params.from} to={params.to} adultSeats={params.adultSeats} childrenSeats={params.childrenSeats} price={params.price} isDeparture={params.isDeparture} reservationId={params.reservationId} flightDate = {params.flightDate} />
        </div>
    );
}

export default Helper;