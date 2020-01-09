import React, { Component } from 'react'
import axios from "axios";
import SingleContactCard from './SingleContactCard';

export default class City extends Component {

    constructor(props) {
        super(props);

        this.state = {
            city: "",
            data: []
        };
    } 

    handleChange = (event) => {

        //This first part is setting the state like normal.
        this.setState({
            [event.target.id]: event.target.value
        }, () => {
            axios.get(`http://ctp-zip-api.herokuapp.com/city/` + this.state.city.toUpperCase())
            .then(response => this.setState({data: response.data}))
            .catch(err => this.setState({data: []}))
        });
    }

    determineDisplay = () => {

        if(Object.keys(this.state.data).length === 0) {
            return (
                <h1>Nothing Found</h1>
            );
        } else {
            return(
                <div>
                    {this.state.data.map( (elem) => {
                        return (
                            <SingleContactCard
                                zipcode={elem}
                                variant="cities"
                            ></SingleContactCard>
                        );
                    })}
                </div>
            );
        }
    }


    render() {

        let zipcodesDisplay = this.determineDisplay();

        return (
            <div>
                <h1>Cities</h1>
                <input id="city" type="text" placeholder="City" onChange={this.handleChange}></input>
                {zipcodesDisplay}
            </div>
        )
    }
}
