import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import SwipeLanding from './SwipeLanding';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    toggleSignup = () => {
        this.props.changeView('signup');
    }

    componentDidMount () {
        console.log('Landing Page mounted!');
    }

    render() {
        return(
            <Container fluid>
                <Container fluid textAlign='center'>
                <h2>Welcome to Nextlens.io</h2>
                <Button basic color='green' size='large' content='Sign up for free' onClick={this.toggleSignup}/>
                </Container>
                <SwipeLanding/>
            </Container>
        )
    }
}
