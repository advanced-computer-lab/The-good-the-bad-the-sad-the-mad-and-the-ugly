import React, {Component} from 'react';
import {Outlet} from 'react-router-dom';

import BaseLayer from './components/BaseLayer';
import CreateFlight from './components/createFlight';
import UpdateFlight from './components/UpdateFlight';


class App extends Component {
    render() {
        return (
            <div>
                <Outlet/>
            </div>
        );
    }
}

export default App;




