import React, { Component } from 'react'
import { Button, Container, Checkbox, Form, Transition, Segment } from 'semantic-ui-react'
import axios from 'axios';
import NavBar from './NavBar';

export default class Signup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Container fluid>
        <NavBar changeView={this.props.changeView}/>
        <Container>
            <Transition animation='jiggle' duration={500} transitionOnMount={true}>
                <Segment>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' />
                        </Form.Field>
                        <Form.Field>    
                            <label>Password</label>
                            <input placeholder='Password' />
                        </Form.Field>
                            <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>

            </Transition>
        </Container>
      </Container>
    )
  }
}