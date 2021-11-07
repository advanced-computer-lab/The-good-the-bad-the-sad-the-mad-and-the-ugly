import React from 'react'

function FlightHeading() {
    return (
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Flight Number</th>
                        <th scope="col">Departure Airport</th>
                        <th scope="col">Arrival Airport</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Departure Date</th>
                        <th scope="col">Arrival Date</th>
                        <th scope="col">Available Business Seats</th>
                        <th scope="col">Available First Class Seats</th>
                        <th scope="col">Available Economy Seats</th>

                    </tr>
                </thead>
    )

}
export default FlightHeading;