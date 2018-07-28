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
      if (result.data.status === false) {
        alert(`Sorry, wrong account and password`);
      } else {
        console.log(`${this.state.email} has been logged in`);
        console.log('data after logging in:  =>', result.data)
        
        this.props.changeState('loggedIn', true);
        this.props.changeState('userState', result.data)
        // this.props.changeState('firstName', result.data.firstname);
        // this.props.changeState('id', result.data.id);
        // this.props.changeState('mount', result.data.mount);
        setTimeout(()=>{this.props.changeView('homepage')}, 90);
        // this.props.changeView('homepage');
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
                <input placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
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


