import React from 'react'
import Modal from "./Modal";
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
                   <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#a"+flight._id}>delete</button>
                   <Modal flightId={flight._id} deleteFunc={props.deleteFunction} flightNumber={flight.flightNumber}/>
               </tr>

    )
}
export default Flight;