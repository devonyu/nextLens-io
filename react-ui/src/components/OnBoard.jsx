import React, { Component } from 'react';

export default class OnBoard extends Component {
    render() {
        return(
            <div>
                <h2>Onboarding HERE!</h2>
                Welcome New User!!  Show this upon initial sign in.  Can show again if unsure how to use!
                <br/>
                
                <h1>Here you will learn how NextLens works!</h1>
                <li>UX and UI tutorial below</li>
                <li>How to use this app</li>
                <li>Photoliker tutorial</li>
                <li>Recommendations</li>
                <li>Reviews</li>
                <li>Editing profile</li>
            </div>
        )
    }
}

//Can use TransitionablePortal to display certain things to user