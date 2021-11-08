import React from 'react'
import {TableCell, tableCellClasses, TableHead, TableRow} from "@mui/material";
import { styled } from '@mui/material/styles';
function FlightHeading() {

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
                        <StyledTableCell>Flight Number</StyledTableCell>
                        <StyledTableCell>Departure Airport</StyledTableCell>
                        <StyledTableCell>Arrival Airport</StyledTableCell>
                        <StyledTableCell>From</StyledTableCell>
                        <StyledTableCell>To</StyledTableCell>
                        <StyledTableCell>Departure Date</StyledTableCell>
                        <StyledTableCell>Arrival Date</StyledTableCell>
                        <StyledTableCell>Available Business Seats</StyledTableCell>
                        <StyledTableCell>Available First Class Seats</StyledTableCell>
                        <StyledTableCell>Available Economy Seats</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
    )

}
export default FlightHeading;