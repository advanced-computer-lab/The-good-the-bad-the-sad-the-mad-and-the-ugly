import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateFlight from "./components/createFlight";
import UpdateFlight from "./components/UpdateFlight";
import ShowAllFlights from "./components/ShowAllFlights";
import ShowFlights from "./components/ShowFlights";
import LoginSide from "./components/Login";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/UserProfile/UserProfile";
import Seats from "./components/Seats/Dashboard.js";
import ChangeReservationSeats from "./components/ChangeReservationSeat";
import UserShowFlights from "./components/UserShowFlights";
import axios from "axios";
import ShowAllUserReservations from "./components/ShowAllUserReservations";
import Payment from "./components/payment"
import CustomizedTabs from "./components/UserProfile/Tab";
import AppBar from "./components/AppBar/appBar";
import MenuAppBar from "./components/AppBar/appBar";
import {createTheme} from "@mui/material/styles";
import Index from "./components/Home/Home"
import Ticket from "./components/Ticket/Ticket"
import LandingPage from "./components/LandingPage/LandingPage";
import "./styles.css"
import Helper from "./components/Helper";
axios.defaults.withCredentials = true;



ReactDOM.render(
  <Router>
          <MenuAppBar />
      <div>
          <Routes>
              <Route path='/' element={<App/>}>
                  <Route path='' element={< Index/>}/>
                  <Route path='payment' element={<Payment/>}></Route>
                  <Route path='home' element={< Index/>}/>
                  <Route path='createFlight' element={<CreateFlight/>}/>
                  <Route path='updateFlight/:id' element={<UpdateFlight/>}/>
                  <Route path='showAllFlights' element={<ShowAllFlights/>}/>
                  <Route path='showFlights' element={<ShowFlights/>}/>
                  <Route path='login' element={<LoginSide/>}/>
                  <Route path='signup' element={<SignUp/>}/>
                  <Route path='selectSeats/:departureFlightId/:returnFlightId/:noOfAdults/:noOfChildren/:cabinClass' element={<Seats/>}/>
                  <Route path='selectSeats/:reservationId' element={<Seats/>}/>
                  <Route path={'userShowFlights'} element={<UserShowFlights/>}/>
                  <Route path='showUserReservations' element={<ShowAllUserReservations/>}/>
                  <Route path='profile' element={<CustomizedTabs/>}/>
                  <Route path='bar' element={<AppBar/>}/>
                  <Route path='changeReservationSeats/:reservationId/:flightType' element={<ChangeReservationSeats/>}/>
                  <Route path='changeReservationSeats/:reservationId/:flightId/:isDeparture/:cabinClass' element={<ChangeReservationSeats/>}/>
                  <Route path='userEditFlight/:from/:to/:flightDate/:adultSeats/:childrenSeats/:price/:isDeparture/:reservationId' element={<Helper/>}/>
                  </Route>
          </Routes>
      </div>
  </Router>,
  document.getElementById('root')
);

