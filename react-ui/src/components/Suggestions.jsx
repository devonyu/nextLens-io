import React, { Component } from 'react';


export default class Suggestions extends Component {
    render() {
        return(
            <div>
                <h1>Suggestions and Feedback Component</h1>
                <br/>
                <ul>Lets user add suggestions to WebApp
                    <li>Suggestions to Lens Recommendations</li>
                    <li>Suggestions to Web App Flow</li>
                    <li>Suggestions to UX and UI interface</li>
                    <li>General Suggestions and feedback</li>
                </ul>
                <div>
                    Drop down menu to give users a specific area to send feedback.
                    This can be done via Formspree API and sent to the specific email address
                    for nextlens.io
                </div>
                <a href='https://formspree.io/'>Formspree API link</a>
            </div>
        )
    }
}