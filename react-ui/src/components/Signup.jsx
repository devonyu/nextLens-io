import React, { Component } from 'react';
import { Button, Container, Form, TextArea, Transition, Segment, Select } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { mounts as options, validateEmail } from './utils';
import ModalControlled from './ModalControlled';

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
      warn: false,
      warning: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMount = this.updateMount.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.warnUser = this.warnUser.bind(this);
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

  warnUser = (open, warning) => {
    this.setState(prevState => ({ warn: open, warning }));
  };

  signupNewUser = info => {
    const { changeView } = this.props;
    axios({
      method: 'post',
      url: '/signup',
      data: info
    })
      .then(result => {
        if (result.data.status === false) {
          this.warnUser(true, 'Email already exists, please use a new email');
        } else if (result.data.status === true) {
          this.warnUser(true, `${info.email} Signed up!`);
          changeView('landing');
        }
      })
      .catch(error => {
        console.log('error inside signup Axios failed');
        console.log(error);
        this.warnUser(true, `Server Error`);
      });
  };

  handleSubmit = () => {
    const { email, password, firstname, mount } = this.state;
    if (validateEmail(email) && password.length >= 5 && firstname && mount) {
      this.signupNewUser(this.state);
    } else if (!validateEmail(email)) {
      this.warnUser(true, 'Invalid Email Format');
    } else if (password.length < 5) {
      this.warnUser(true, 'Password must be at least 5 characters');
    } else if (!firstname) {
      this.warnUser(true, 'First Name required');
    } else if (!mount) {
      this.warnUser(true, 'Please Select a Camera Mount');
    }
  };

  render() {
    const { firstname, email, password, mount, about, profileimgurl, warn, warning } = this.state;
    return (
      <Container>
        <ModalControlled open={warn} message={warning} close={this.warnUser} />
        <Transition animation="pulse" duration={500} transitionOnMount>
          <Segment>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  onChange={this.handleChange}
                />
              </Form.Field>
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
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field
                control={Select}
                label="Camera Mount"
                options={options}
                value={mount}
                placeholder="Your Camera Mount"
                onChange={this.updateMount}
              />
              <Form.Field
                control={TextArea}
                label="Profile Image URL"
                placeholder="Copy your Profile image url here"
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
              <Button type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Segment>
        </Transition>
      </Container>
    );
  }
}

Signup.propTypes = {
  changeView: PropTypes.func.isRequired
};
