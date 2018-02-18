import React, { Component } from 'react'
import { Button, Container, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import NavBar from './NavBar';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Container fluid>
      <NavBar changeView={this.props.changeView}/>
      <Container fluid>
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
      </Container>
    )

  }
}


