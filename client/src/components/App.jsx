import React, { Component } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import ShowFlights from './ShowFlights';
import ShowAllFlights from './ShowAllFlights';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <div>
                        <Router path='/showFlights' element={<ShowFlights />} />
                        <Router path='/showAllFlights' element={<ShowAllFlights />} />
                    </div>
                </Routes>
            </Router>
        );
    }
}

export default App;