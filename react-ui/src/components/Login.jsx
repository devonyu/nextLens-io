import React, { Component } from 'react';
import { Button, Container, Form, Segment, Transition } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    axios({
      method: 'post',
      url: '/login',
      data: this.state
    })
      .then(result => {
        if (result.data.error) {
          // Possible modal is better than an alert
          alert(`Sorry, wrong account and password`);
        } else {
          const cookies = new Cookies();
          cookies.set('connection', result.data.cookie, { path: '/' });
          this.props.changeState('loggedIn', true);
          this.props.changeState('userState', result.data);
          this.props.changeView('homepage');
          // console.log('user has signed in, here is the data we have: ', result.data);
        }
      })
      .catch(error => {
        // Possible modal is better than an alert
        alert(`Sorry, wrong account and password`);
        // console.log(error);
      });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
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
    const { email, password } = this.state;
    return (
      <Container fluid>
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
