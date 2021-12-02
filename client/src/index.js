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

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path='/' element={<App/>}>
                  <Route path='createFlight' element={<CreateFlight/>}/>
                  <Route path='updateFlight/:id' element={<UpdateFlight/>}/>
                  <Route path='' element={<ShowAllFlights/>}/>
                  <Route path='showFlights' element={<ShowFlights/>}/>
                  <Route path='login' element={<LoginSide/>}/>
                  <Route path='signup' element={<SignUp/>}/>
              </Route>

          </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

