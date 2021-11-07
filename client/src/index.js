import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateFlight from "./components/createFlight";
import UpdateFlight from "./components/UpdateFlight";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path='/' element={<App/>}>
                  <Route path='create-flight' element={<CreateFlight/>}/>
                  <Route path='update-flight/:id' element={<UpdateFlight/>}/>
              </Route>

          </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
