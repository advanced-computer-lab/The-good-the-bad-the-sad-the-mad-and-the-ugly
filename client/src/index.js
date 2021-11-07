import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateFlight from "./components/createFlight";
import UpdateFlight from "./components/UpdateFlight";
import ShowAllFlights from "./components/ShowAllFlights";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path='/' element={<App/>}>
                  <Route path='create-flight' element={<CreateFlight/>}/>
                  <Route path='update-flight/:id' element={<UpdateFlight/>}/>
                  <Route path='show-all-flights' element={<ShowAllFlights/>}/>
              </Route>

          </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

