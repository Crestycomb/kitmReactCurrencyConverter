import React, {Component} from 'react';
import styles from './main.css';

function Main() {
    return (

        <div className="container-fluid bg-secondary">
            <div className="container">
                <div className="row">
                    <ApiStuff/>
                </div>
            </div>
        </div>
    );
}

class ApiStuff extends Component {


    apiLink = "https://currencyapi.net/api/v1/rates?key=b278c0399db9613e31145d0650b443374a64&base="
    currencyBase = "USD"; // cant change this without subscription
    cors = "https://cors-anywhere.herokuapp.com/";

    constructor() {
        super();
        this.state = {
            data: {
                rates:{

                }
            },
            hasErrors: null,
            isLoaded: false,
            currencyValue: 0,
            convertTo: "AUD"
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNumberChange = function (e) {
        this.setState({currencyValue: e.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.currencyValue);
        event.preventDefault();
    }

    componentDidMount() {

        let endpoint = this.cors + this.apiLink + this.currencyBase;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => this.setState({data: res}))
            .catch(() => this.setState({hasErrors: true}));
    }

    render() {
        return (

            <div className="col">
                <form onSubmit={this.handleSubmit} className="form-inline">

                    <label>
                        Currency
                        <input type="number" value={this.state.currencyValue} onChange={this.handleNumberChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

                <div className="col">
                    to {this.state.convertTo} for now
                    <p>{this.state.currencyValue * this.state.data.rates.
                    }</p>

                </div>
            </div>

        )
    }
}

export default Main;