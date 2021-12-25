import * as React from 'react';
import "./styles.css"
import axios from "axios";
import {useEffect} from "react";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const { useState } = React;

const style = {
    fontFamily: "Montserrat"
}

const Flight = [
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px" },

        label: "rgb(13, 28, 83)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px" },

        label: "rgb(90, 5, 49)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px" },

        label: "rgb(230, 26, 56)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px" },

        label: "rgb(252, 178, 50)" },

    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px" },

        label: "rgb(13, 28, 83)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px" },

        label: "rgb(90, 5, 49)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px" },

        label: "rgb(230, 26, 56)" },

    {
        src:
            "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px" },

        label: "rgb(252, 178, 50)" }];



const Cell = props => {
    const index = props.index%8;
    const [active, handleActive] = useState(false);
    const [clicked, handleClicking] = useState(false);
    const flight = props.flight;
    const departureDate = new Date(flight.departure);
    const arrivalDate = new Date(flight.arrival);
    const duration = Math.abs(arrivalDate - departureDate);
    const diff = Math.ceil(duration / (1000 * 60));
    const diffHours = Math.ceil(diff/60);
    const diffMinutes = diff%60;
    const key = flight._id;
    const selected = key
    const price = parseInt(props.adults) * parseInt(flight.price[props.seatClass]["adult"]) + parseInt(props.children) * parseInt(flight.price[props.seatClass]["child"]);



    function handleClick() {
        if (props.departure) {
            if (props.selected) {
                props.onBookingDepartureFunction(null);
            }
            else {
                props.onBookingDepartureFunction(flight._id);
            }
        }
        else {
            if (props.selected) {
                props.onBookingReturningFunction(null);
            }
            else {
                props.onBookingReturningFunction(flight._id);
            }
        }
        handleClicking(true);
    }

    return /*#__PURE__*/(

        React.createElement("div", {
                id: "cardContainer",
                style: {
                    height: active ? `300px` : `100px`,
                    transition: "0.9s" },

                onClick: () => {
                        handleActive(!active);
                } }, /*#__PURE__*/

            React.createElement("div", { id: "firstDisplay" }, /*#__PURE__*/
                React.createElement("div", { id: "flightDetail" }, /*#__PURE__*/
                    React.createElement("div", {
                        id: "detailLabel",
                        style: { fontWeight: "bold", color: Flight[index].label } }, "From"), flight.from, /*#__PURE__*/




                    React.createElement("div", { id: "detailLabel" }, flight.departureAirport)), /*#__PURE__*/

                React.createElement("div", {
                        id: "flightDetail",
                        style: {
                            marginTop: "15px" } }, /*#__PURE__*/


                    React.createElement("div", { id: "animContainer" }, /*#__PURE__*/
                        // React.createElement("div", { id: "anim" }, /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }), /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }), /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }))
                    ), /*#__PURE__*/


                    React.createElement("div", { id: "animContainer", style: { left: "62px" } }, /*#__PURE__*/
                        // React.createElement("div", { id: "anim" }, /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }), /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }), /*#__PURE__*/
                        //     React.createElement("div", { id: "circle" }))
                    ), /*#__PURE__*/


                    React.createElement("img", {
                        style: { width: "30px" },
                        src: "https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true" })), /*#__PURE__*/


                React.createElement("div", { id: "flightDetail" }, /*#__PURE__*/
                    React.createElement("div", {
                        id: "detailLabel",
                        style: { fontWeight: "bold", color: Flight[index].label } }, "To"), flight.to, /*#__PURE__*/




                    React.createElement("div", { id: "detailLabel" }, flight.arrivalAirport))), /*#__PURE__*/


            React.createElement("div", {
                    id: "first",
                    style: {
                        transform: active ?
                            `rotate3d(1, 0, 0, -180deg)` :
                            `rotate3d(1, 0, 0, 0deg)`,
                        transitionDelay: active ? "0s" : "0.3s" } }, /*#__PURE__*/


                React.createElement("div", { id: "firstTop" }, /*#__PURE__*/
                    React.createElement("img", { style: Flight[index].style, src: Flight[index].src }), /*#__PURE__*/
                    React.createElement("div", { id: "timecontainer" }, /*#__PURE__*/
                        React.createElement("div", { id: "detailDate" }, flight.from, /*#__PURE__*/

                            React.createElement("div", { id: "detailTime" }, `${(departureDate.getHours() <= 9 ? "0" + departureDate.getHours(): departureDate.getHours())}:${(departureDate.getMinutes() <= 9 ? "0" + departureDate.getMinutes() : departureDate.getMinutes())}`), `${departureDate.getFullYear()}-${departureDate.getMonth() + 1}-${departureDate.getDate()}`), /*#__PURE__*/


                        React.createElement("img", {
                            style: {
                                width: "30px",
                                height: "26px",
                                marginTop: "22px",
                                marginLeft: "16px",
                                marginRight: "16px" },

                            src: "https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true" }), /*#__PURE__*/

                        React.createElement("div", { id: "detailDate" }, flight.to, /*#__PURE__*/

                            React.createElement("div", { id: "detailTime" }, `${(arrivalDate.getHours() <= 9 ? "0" + arrivalDate.getHours() : arrivalDate.getHours())}:${(arrivalDate.getMinutes() <= 9 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes())}`), `${arrivalDate.getFullYear()}-${(arrivalDate.getMonth() + 1)}-${arrivalDate.getDate()}`))), /*#__PURE__*/




                React.createElement("div", { id: "firstBehind" }, /*#__PURE__*/
                    React.createElement("div", { id: "firstBehindDisplay" }, /*#__PURE__*/
                        React.createElement("div", { id: "firstBehindRow" }, /*#__PURE__*/
                            React.createElement("div", { id: "detail" }, `${(departureDate.getHours() <= 9 ? "0" + departureDate.getHours(): departureDate.getHours())}:${(departureDate.getMinutes() <= 9 ? "0" + departureDate.getMinutes() : departureDate.getMinutes())} - ${(arrivalDate.getHours() <= 9 ? "0" + arrivalDate.getHours() : arrivalDate.getHours())}:${(arrivalDate.getMinutes() <= 9 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes())}`, /*#__PURE__*/

                                React.createElement("div", { id: "detailLabel" }, "Flight Time")), /*#__PURE__*/

                            // React.createElement("div", { id: "detail" }, "No", /*#__PURE__*/
                            //
                            //     React.createElement("div", { id: "detailLabel" }, "Transfer"))
                        ), /*#__PURE__*/


                        React.createElement("div", { id: "firstBehindRow" }, /*#__PURE__*/
                            React.createElement("div", { id: "detail" }, `${(diffHours)}h ${(diffMinutes)}min`, /*#__PURE__*/

                                React.createElement("div", { id: "detailLabel" }, "Duration")), /*#__PURE__*/

                            // React.createElement("div", { id: "detail" }, "8", /*#__PURE__*/
                            //     React.createElement("div", { id: "detailLabel" }, "Gate"))
                        ), /*#__PURE__*/


                        React.createElement("div", { id: "firstBehindRow" }, /*#__PURE__*/
                            React.createElement("div", { id: "detail" }, `${flight.baggageAllowance} Kg`, /*#__PURE__*/

                                React.createElement("div", { id: "detailLabel" }, "Baggage Allowance")), /*#__PURE__*/

                            // React.createElement("div", { id: "detail" }, "20A", /*#__PURE__*/
                            //
                            //     React.createElement("div", { id: "detailLabel" }, "Seat"))
                        )), /*#__PURE__*/



                    React.createElement("div", {
                            id: "second",
                            style: {
                                transform: active ?
                                    `rotate3d(1, 0, 0, -180deg)` :
                                    `rotate3d(1, 0, 0, 0deg)`,
                                transitionDelay: active ? "0.2s" : "0.2s" } }, /*#__PURE__*/


                        React.createElement("div", { id: "secondTop" }), /*#__PURE__*/
                        React.createElement("div", { id: "secondBehind" }, /*#__PURE__*/
                            React.createElement("div", { id: "secondBehindDisplay" }, /*#__PURE__*/
                                React.createElement("div", { id: "price" }, `${parseInt(price)} EGP`, /*#__PURE__*/

                                    React.createElement("div", { id: "priceLabel" }, "Price")), /*#__PURE__*/

                                // React.createElement("div", { id: "price" }, "Economy", /*#__PURE__*/
                                //
                                //     React.createElement("div", { id: "priceLabel" }, "Class")), /*#__PURE__*/

                                React.createElement("img", {
                                    id: "barCode",
                                    src: "https://github.com/pizza3/asset/blob/master/barcode.png?raw=true" })), /*#__PURE__*/


                            React.createElement("div", {
                                    id: "third",
                                    style: {
                                        transform: active ?
                                            `rotate3d(1, 0, 0, -180deg)` :
                                            `rotate3d(1, 0, 0, 0deg)`,
                                        transitionDelay: active ? "0.4s" : "0s" } }, /*#__PURE__*/


                                React.createElement("div", { id: "thirdTop" }), /*#__PURE__*/
                                React.createElement("div", { id: "secondBehindBottom" },
                                    <Button variant="contained" color={props.selected ?"success":"primary"} onClick={handleClick} size="large"> {props.selected ? "Booked!" : "Book Now"} </Button>
                                    /*#__PURE__*/
                                    // React.createElement("button", {
                                    //     id: "button",
                                    //     style: {
                                    //         color: Flight[index].label,
                                    //         border: `1px solid ${Flight[index].label}` } }, "Pay")
                                ))))))));












};


const Header = (title) => { /*#__PURE__*/
    return (React.createElement("div", null, /*#__PURE__*/
        // React.createElement("svg", {
        //         id: "back",
        //         xmlns: "http://www.w3.org/2000/svg",
        //         width: "512",
        //         height: "512",
        //         viewBox: "0 0 512 512" }, /*#__PURE__*/
        //
        //     React.createElement("polyline", {
        //         points: "244 400 100 256 244 112",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "48px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "120",
        //         y1: "256",
        //         x2: "412",
        //         y2: "256",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "48px" } })), /*#__PURE__*/


        React.createElement("div", {id: "headerText", style: { fontFamily: "Montserrat"}}, title), /*#__PURE__*/
        // React.createElement("div", { id: "tripDetail" }, "Your Trip", /*#__PURE__*/
        //
        //     React.createElement("div", { id: "tripDest" }, "BLR - DEL", /*#__PURE__*/
        //         React.createElement("div", { id: "oneWay" }, "One Way"), /*#__PURE__*/
        //         React.createElement("div", null)), "12th June, 2020"), /*#__PURE__*/


        // React.createElement("svg", {
        //         id: "settings",
        //         xmlns: "http://www.w3.org/2000/svg",
        //         width: "512",
        //         height: "512",
        //         viewBox: "0 0 512 512" }, /*#__PURE__*/
        //
        //     React.createElement("line", {
        //         x1: "368",
        //         y1: "128",
        //         x2: "448",
        //         y2: "128",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "64",
        //         y1: "128",
        //         x2: "304",
        //         y2: "128",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "368",
        //         y1: "384",
        //         x2: "448",
        //         y2: "384",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "64",
        //         y1: "384",
        //         x2: "304",
        //         y2: "384",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "208",
        //         y1: "256",
        //         x2: "448",
        //         y2: "256",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("line", {
        //         x1: "64",
        //         y1: "256",
        //         x2: "144",
        //         y2: "256",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("circle", {
        //         cx: "336",
        //         cy: "128",
        //         r: "32",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("circle", {
        //         cx: "176",
        //         cy: "256",
        //         r: "32",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }), /*#__PURE__*/
        //
        //
        //     React.createElement("circle", {
        //         cx: "336",
        //         cy: "384",
        //         r: "32",
        //         style: {
        //             fill: "none",
        //             stroke: "#000",
        //             strokeLinecap: "round",
        //             strokeLinejoin: "round",
        //             strokeWidth: "32px" } }))
    ));
};







const DataArr = Array(8).
fill(0).
map(Number.call, Number);
console.log(DataArr)

function Ticket(props){
    const flights = props.flights;
    const selectedId = props.selectedId;
    const departure = props.departure;


    return /*#__PURE__*/(
        React.createElement("div", { className: "App" },
            Header(props.title),
            flights.map((flight, i) => /*#__PURE__*/
                React.createElement(Cell, { key: i, index: i ,
                    flight: flight,
                    selected: flight._id === selectedId,
                    departure: departure,
                    seatClass: props.seatClass,
                    adults: props.adults,
                    children: props.children,
                    onBookingDepartureFunction: props.onBookingDepartureFunction,
                    onBookingReturningFunction: props.onBookingReturningFunction,
                }))));



};

export default Ticket;
// ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(App, null)), rootElement);