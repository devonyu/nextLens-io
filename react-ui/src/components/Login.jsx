import React, { Component } from 'react';
import { Button, Container, Form, Segment, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ModalControlled from './ModalControlled';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      warn: false,
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
        this.warnUser(true, 'Wrong Account or Password');
        // console.log('err => ', error);
      });
  };

  warnUser = (open, warning) => {
    this.setState(prevState => ({ warn: open, warning }));
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
    const { email, password, warn, warning } = this.state;
    return (
      <Container fluid>
        <ModalControlled open={warn} message={warning} close={this.warnUser} />
        <Transition animation="pulse" duration={500} transitionOnMount>
          <Segment>
            <Container>
              <Form>
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
                <Button type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Container>
          </Segment>
        </Transition>
      </Container>
    );
  }
}

Login.propTypes = {
  changeView: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired
};
