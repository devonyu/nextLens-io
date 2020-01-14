import React, { Component } from 'react';
import { Button, Form, Message, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1b1c1d;
  min-width: 320px;
  width: min-content;
  margin: 5% auto;
  padding: 1em;
  position: relative;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  max-height: 800px;
  max-width: 600px;
  width: 75vw;
  border-radius: 10px;
  padding: 1em;
  position: relative;
`;

const Signup = styled.span`
  color: blue;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
`;

const ErrorMessage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  padding: 2px;
  color: red;
  font-size: 0.8em;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      warning: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.warnUser = this.warnUser.bind(this);
  }

  handleSubmit = e => {
    const { changeState, changeView } = this.props;
    axios({
      method: 'post',
      url: '/login',
      data: this.state
    })
      .then(result => {
        const cookies = new Cookies();
        cookies.set('connection', result.data.cookie, { path: '/' });
        changeState('loggedIn', true);
        changeState('userState', result.data);
        changeView('homepage');
      })
      .catch(error => {
        this.warnUser('Wrong Account or Password');
        // console.log('err => ', error);
      });
  };

  warnUser = warning => {
    this.setState(prevState => ({ warning }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (name !== 'email') {
      this.setState({
        [name]: value
      });
    } else {
      this.setState({
        [name]: value.toLowerCase()
      });
    }
  };

  render() {
    const { email, password, warning } = this.state;
    const { changeView } = this.props;
    return (
      <LoginContainer>
        <Transition animation="pulse" duration={300} transitionOnMount>
          <LoginForm>
            <Form>
              <h1>Login</h1>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  name="password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <FlexRow>
                <Button type="submit" color="green" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <ErrorMessage>{warning}</ErrorMessage>
              </FlexRow>
            </Form>
            <br />
            <Message attached="bottom" warning>
              Need to sign up?&nbsp;
              <Signup
                onClick={() => {
                  changeView('signup');
                }}
              >
                Sign up here
              </Signup>
              &nbsp;instead.
            </Message>
          </LoginForm>
        </Transition>
      </LoginContainer>
    );
  }
}

Login.propTypes = {
  changeView: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired
};
