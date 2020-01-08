import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeLanding from './SwipeLanding';

const Title = styled.h1`
  color: white;
  font-size: 3em;
`;

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
          <Title>Welcome to Nextlens.io</Title>
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
