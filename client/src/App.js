import React, {Component} from 'react';
import {Outlet} from 'react-router-dom';
import axios from "axios";

class App extends Component {

    render() {
        axios.defaults.withCredentials = true;
        return (
            <div>
                <Outlet/>
            </div>
        );
    }
}

export default App;




