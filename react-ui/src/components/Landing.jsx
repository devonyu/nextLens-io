import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SwipeLanding from './SwipeLanding';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.toggleSignup = this.toggleSignup.bind(this);
  }

  componentDidMount() {
    console.log('Landing Page Component mounted!');
  }

  toggleSignup = () => {
    const { changeView } = this.props;
    changeView('signup');
  };

  render() {
    return (
      <Container fluid>
        <Container fluid textAlign="center">
          <h2>Welcome to Nextlens.io</h2>
          <Button
            basic
            color="green"
            size="large"
            content="Sign up for free"
            onClick={this.toggleSignup}
          />
        </Container>
        <SwipeLanding />
      </Container>
    );
  }
}

Landing.propTypes = {
  changeView: PropTypes.func.isRequired
};
