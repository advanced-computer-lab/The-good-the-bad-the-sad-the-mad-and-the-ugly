import React, { Component } from "react";
import logo from "./logo.svg";
import StripeBtn from "./stripeBtn";
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Stripe Checkout - ReactJS</p>
                    <StripeBtn />
                </header>
            </div>
        );
    }
}
export default App;