import React, { Component } from 'react'
import { Button, Container, Form, Segment, Transition } from 'semantic-ui-react'
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    axios({
      method: 'post',
      url: '/login',
      data: this.state
    }).then((result) => {
      console.log('result of login response ===>', result.data)
      if (result.data.error) {
        alert(`Sorry, wrong account and password`);
      } else {
        console.log(`${this.state.email} has been logged in`);
        console.log('data after logging in:  =>', result.data);
        this.props.changeState('loggedIn', true);
        this.props.changeState('userState', result.data);
        this.props.changeView('homepage');
      }
    })
    .catch((error) => {
      alert(`Sorry, wrong account and password`)
      console.log(error);
    });
  }

  handleChange = (event) => {
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
  }

  render() {
    const { email, password } = this.state;
    return(
      <Container fluid>
      <Transition animation='pulse' duration={500} transitionOnMount={true}>
        <Segment>
          <Container>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' name='email' value={email} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' name='password' value={password} type='password' onChange={this.handleChange}/>
              </Form.Field>
              <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
            </Form>
            </Container>
          </Segment>
        </Transition>
      </Container>
    )
  }
}


