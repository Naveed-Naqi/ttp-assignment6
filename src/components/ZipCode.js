import React, { Component } from 'react'
import axios from "axios";
import SingleContactCard from './SingleContactCard';

export default class ZipCode extends Component {

    constructor(props) {
        super(props);

        this.state = {
            zipcode: "",
            data: []
        };
    } 

    handleChange = (event) => {

        //This first part is setting the state like normal.
        this.setState({
            [event.target.id]: event.target.value
        }, () => {
            axios.get(`http://ctp-zip-api.herokuapp.com/zip/` + this.state.zipcode)
            .then(response => this.setState({data: response.data}))
            .catch(err => this.setState({data: []}))
        });
    }

    determineDisplay = () => {

        if(this.state.data.length === 0) {
            return (
                <h1>Nothing Found</h1>
            );
        } else {
            return(
                <div>
                    {this.state.data.map( (elem) => {
                        return (
                            <SingleContactCard
                                key={elem.City+elem.Lat+elem.Long}
                                city={elem.City}
                                state={elem.State}
                                lat={elem.Lat}
                                long={elem.Long}
                                pop={elem.EstimatedPopulation}
                                variant="zipcode"
                            ></SingleContactCard>
                        );
                    })}
                </div>
            );
        }
    }


    render() {

        let citiesDisplay = this.determineDisplay();

        return (
            <div>
                <h1>Zip Code</h1>
                <input id="zipcode" type="text" placeholder="zip code" onChange={this.handleChange}></input>
                {citiesDisplay}
            </div>
        )
    }
}
