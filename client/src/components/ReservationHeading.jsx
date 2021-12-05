import React from 'react'
import {TableCell, tableCellClasses, TableHead, TableRow} from "@mui/material";
import { styled } from '@mui/material/styles';
function ReservationHeading() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <TableHead>
            <TableRow>
                {/* <th scope="col">#</th> */}
                <StyledTableCell>User Id</StyledTableCell>
                <StyledTableCell>Departure Flight</StyledTableCell>
                <StyledTableCell>Return Flight</StyledTableCell>
                <StyledTableCell>Adults</StyledTableCell>
                <StyledTableCell>Children</StyledTableCell>
                <StyledTableCell>Cabin Class</StyledTableCell>
                <StyledTableCell>Departure Seats</StyledTableCell>
                <StyledTableCell>Return Seats</StyledTableCell>
            </TableRow>
        </TableHead>
    )

}
export default ReservationHeading;