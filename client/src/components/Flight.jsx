import React, {useState} from 'react'
import {TableCell, TableRow, Button, tableCellClasses} from "@mui/material";
import DeleteModal from "./DeleteModal";
import { styled } from '@mui/material/styles';

function Flight(props) {
   const flight = props.flight;
   const [modalOpen, setModalOpen] = useState(false);
   const handleOpen = () => setModalOpen(true);
   const handleClose = () => setModalOpen(false);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
               <StyledTableRow>
                   {/* <td scope="row">{flight.idx}</td> */}
                   <StyledTableCell>{flight.flightNumber}</StyledTableCell>
                   <StyledTableCell>{flight.departureAirport}</StyledTableCell>
                   <StyledTableCell>{flight.arrivalAirport}</StyledTableCell>
                   <StyledTableCell>{flight.from}</StyledTableCell>
                   <StyledTableCell>{flight.to}</StyledTableCell>
                   <StyledTableCell>{flight.departure}</StyledTableCell>
                   <StyledTableCell>{flight.arrival}</StyledTableCell>
                   <StyledTableCell>{flight.availableSeats.business}</StyledTableCell>
                   <StyledTableCell>{flight.availableSeats.first}</StyledTableCell>
                   <StyledTableCell>{flight.availableSeats.economy}</StyledTableCell>
                   <StyledTableCell><Button color={"error"} onClick={handleOpen}>delete</Button></StyledTableCell>
                   <DeleteModal flightId={flight._id} deleteFunc={props.deleteFunction} flightNumber={flight.flightNumber} modalOpen={modalOpen} handleClose={handleClose}/>
               </StyledTableRow>

    )
}
export default Flight;