import React from 'react'

function Flight(props) {
   const flight = props.flight;
    return (
                <tr>
                    {/* <td scope="row">{flight.idx}</td> */}
                    <td>{flight.flightNumber}</td>
                    <td>{flight.departureAirport}</td>
                    <td>{flight.arrivalAirport}</td>
                    <td>{flight.from}</td>
                    <td>{flight.to}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.arrival}</td>
                    <td>{flight.availableSeats.business}</td>
                    <td>{flight.availableSeats.first}</td>
                    <td>{flight.availableSeats.economy}</td>
                </tr>
    )
}
export default Flight;