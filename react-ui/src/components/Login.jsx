import React, { Component } from 'react'
import { Button, Container, Form, Segment, Transition } from 'semantic-ui-react'
import axios from 'axios';
import NavBar from './NavBar';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {

  }

  render() {
    return(
      <Container fluid>
      <NavBar changeView={this.props.changeView}/>
      <Transition animation='jiggle' duration={500} transitionOnMount={true}>
        <Segment fluid>
          <Container>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
            </Container>
          </Segment>
        </Transition>
      </Container>
    )

  }
}


