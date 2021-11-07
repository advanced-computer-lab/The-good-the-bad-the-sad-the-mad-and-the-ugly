import React, {Component} from 'react';
import {Outlet} from 'react-router-dom';


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




