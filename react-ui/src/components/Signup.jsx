import React, { Component } from 'react';
import { Button, Form, Message, TextArea, Transition, Select } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import { mounts as options, validateEmail } from './utils';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1b1c1d;
  min-width: 320px;
  width: min-content;
  margin: 5% auto;
  padding: 1em;
  position: relative;
`;

const SignupForm = styled.div`
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

const FlexRow = styled.div`
  display: flex;
`;

const Login = styled.span`
  color: blue;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;
  padding: 2px;
  color: red;
  font-size: 0.8em;
`;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      email: '',
      password: '',
      mount: '',
      about: '',
      profileimgurl: '',
      warnings: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMount = this.updateMount.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.warnUser = this.warnUser.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

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

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  };

  warnUser = (label, warning) => {
    let errors = null;
    if (label === 'emailexists') {
      errors = [warning];
    } else {
      errors = this.checkErrors();
    }
    this.setState(prevState => ({ warnings: errors }));
  };

  checkErrors = () => {
    const { email, password, firstname, mount } = this.state;
    const errors = [];
    if (!validateEmail(email)) {
      errors.push('Invalid Email');
    }
    if (!firstname) {
      errors.push('First Name required');
    }
    if (!mount) {
      errors.push('Camera Mount required');
    }
    if (password.length < 5) {
      errors.push('Password must be at least 5 characters');
    }
    return errors;
  };

  handleBlur = () => {
    this.warnUser();
  };

  signupNewUser = info => {
    const { changeView, changeState } = this.props;
    axios({
      method: 'post',
      url: '/signup',
      data: info
    })
      .then(result => {
        if (result.data.status === false) {
          this.warnUser('emailexists', 'Email already exists, please use a new email');
        } else {
          console.log('signedup now what');
          const cookies = new Cookies();
          cookies.set('connection', result.data.cookie, { path: '/' });
          changeState('loggedIn', true);
          changeState('userState', result.data);
          changeView('homepage');
        }
      })
      .catch(error => {
        console.log('error inside signup Axios failed');
        console.log(error);
        this.warnUser(`server`, `Server Error`);
      });
  };

  handleSubmit = () => {
    const { email, password, firstname, mount } = this.state;
    if (validateEmail(email) && password.length >= 5 && firstname && mount) {
      this.signupNewUser(this.state);
    } else if (!validateEmail(email)) {
      this.warnUser('email', 'Invalid Email Format');
    } else if (password.length < 5) {
      this.warnUser(`password`, 'Password must be at least 5 characters');
    } else if (!firstname) {
      this.warnUser(`firstname`, 'First Name required');
    } else if (!mount) {
      this.warnUser(`mount`, 'Please Select a Camera Mount');
    }
  };

  render() {
    const { firstname, email, password, mount, about, profileimgurl, warnings } = this.state;
    const { changeView } = this.props;
    return (
      <SignupContainer>
        <Transition animation="pulse" duration={300} transitionOnMount>
          <SignupForm>
            <Form>
              <h1>Sign Up</h1>
              <Form.Field>
                <label>First Name *</label>
                <input
                  placeholder="First Name (required)"
                  name="firstname"
                  value={firstname}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </Form.Field>
              <Form.Field>
                <label>Email *</label>
                <input
                  placeholder="Email (required)"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </Form.Field>
              <Form.Field>
                <label>Password *</label>
                <input
                  placeholder="Password (Min 5 chars)"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </Form.Field>
              <Form.Field
                control={Select}
                label="Camera Mount *"
                options={options}
                value={mount}
                placeholder="Your Camera Mount (required)"
                onChange={this.updateMount}
                onBlur={this.handleBlur}
              />
              <Form.Field
                control={TextArea}
                rows="1"
                label="Profile Image URL"
                placeholder="https://site.com/image.jpg"
                name="profileimgurl"
                value={profileimgurl}
                onChange={this.handleChange}
              />
              <Form.Field
                control={TextArea}
                label="About"
                placeholder="Tell us more about yourself..."
                name="about"
                value={about}
                onChange={this.handleChange}
              />
              <FlexRow>
                <Button type="submit" color="green" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <ErrorMessage>
                  {warnings.map(warning => (
                    <p key={warning} style={{ textAlign: 'center' }}>
                      {warning}
                    </p>
                  ))}
                </ErrorMessage>
              </FlexRow>
            </Form>
            <br />
            <Message attached="bottom" warning>
              Already signed up?&nbsp;
              <Login
                onClick={() => {
                  changeView('login');
                }}
              >
                Login here
              </Login>
              &nbsp;instead.
            </Message>
          </SignupForm>
        </Transition>
      </SignupContainer>
    );
  }
}

Signup.propTypes = {
  changeView: PropTypes.func.isRequired
};
