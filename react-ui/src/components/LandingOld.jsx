import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeLanding from './SwipeLanding';

const Title = styled.h1`
  color: white;
  font-size: 3em;
`;

const LandingContainer = styled.div`
  max-height: calc(100%vh - 73px);
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
`;

const SignupButton = styled.button`
  height: 40px;
  color: green;
  font-size: 20px;
  border: 1px solid white;
  background-color: transparent;
  border-radius: 10px;
  align-self: center;
  width: 200px;
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
      <LandingContainer>
        <Title>Welcome to Nextlens.io</Title>
        <SignupButton onClick={this.toggleSignup}>Sign up for free</SignupButton>
        <SwipeLanding />
      </LandingContainer>
    );
  }
}

Landing.propTypes = {
  changeView: PropTypes.func.isRequired
};
