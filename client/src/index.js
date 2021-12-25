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
import Seats from "./components/Seats/Dashboard.js";
import ChangeReservationSeats from "./components/ChangeReservationSeat";
import UserShowFlights from "./components/UserShowFlights";
import axios from "axios";
import ShowAllUserReservations from "./components/ShowAllUserReservations";
import CustomizedTabs from "./components/UserProfile/Tab";
import AppBar from "./components/AppBar/appBar";
import MenuAppBar from "./components/AppBar/appBar";
import {createTheme} from "@mui/material/styles";
import Index from "./components/Home/Home"

axios.defaults.withCredentials = true;

const darkTheme = createTheme({
    palette: {
        mode: 'dark',

    },
});

ReactDOM.render(
  <Router>
      {/*<ThemeProvider theme={darkTheme}>*/}
      {/*    <CssBaseline />*/}
          <MenuAppBar />
      <div>
          <Routes>
              <Route path='/' element={<App/>}>
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
              </Route>
          </Routes>
      </div>
      {/*</ThemeProvider>*/}
  </Router>,
  document.getElementById('root')
);

