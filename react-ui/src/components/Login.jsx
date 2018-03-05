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
    console.log('submit hit: ', this.state);
    axios({
      method: 'post',
      url: '/login',
      data: this.state
    }).then((result) => {
      console.log('sent to server and back: ', result);
      if (result.data.status === false) {
        alert(`Sorry, wrong account and password`);
      } else {
        console.log(`${this.state.email} has been logged in`);
        // change state to user information
        // change view to photoliker or userHomepage
        this.props.changeView('homepage');
        this.props.changeState('loggedIn', true);
        this.props.changeState('userName', result.data.firstname);
        this.props.changeState('id', result.data.id);
        this.props.changeState('mount', result.data.mount);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return(
      <Container fluid>
      <Transition animation='pulse' duration={500} transitionOnMount={true}>
        <Segment>
          <Container>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' name='email' onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' name='password' onChange={this.handleChange}/>
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


