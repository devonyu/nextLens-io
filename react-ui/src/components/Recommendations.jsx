import React, { Component } from 'react';

export default class Recommendations extends Component {
    render() {
        console.log('recommendations mounted, axios call to DB for algorithm!')
        return(
            <div>
                <h1>Recommendations HERE</h1>
                <li>Lens 1</li>
                <li>Lens 2</li>
                <li>Lens 3</li>
                <li>Lens 4</li>
                <li>Lens 5</li>
            </div>
        )
    }
}