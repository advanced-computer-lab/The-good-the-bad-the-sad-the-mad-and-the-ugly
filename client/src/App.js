import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import BaseLayer from './components/BaseLayer';
import CreateFlight from './components/createFlight';


class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                        <Route path='/' element={<BaseLayer />} />
                        <Route path='/create-flight' element={<CreateFlight />} />
                </Routes>
            </Router>
        );
    }
}

export default App;




