import React, { Component } from 'react'
import { Button, Container, Form, TextArea, Transition, Segment, Select } from 'semantic-ui-react'
import axios from 'axios';
import NavBar from './NavBar';
const options = require('./utils.js');
// Addition filters can be which specific mount (EG. FX or DX)

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        email: '',
        password: '',
        mount: '',
        about: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMount = this.updateMount.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  }

  signupNewUser = (info) => {
      // takes in the current state (must make sure that it is valid)
      // then checks to see if database includes current email already
      // if not, write to DB and save user information for login page
      axios({
        method: 'post',
        url: '/signup',
        data: info
      }).then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  handleSubmit = () => {
    // if no err (checks db for username on change of state for email)
    // signup user and save their information inside DB

    if (this.state.email !== 'wontwork@email.com') {
        this.signupNewUser(this.state);
    } else {
        alert('Invalid email! wontwork@email.com')
    }
  }

  render() {
    const { firstName, email, password, mount, about} = this.state

    return(
      <Container fluid>
        <NavBar changeView={this.props.changeView}/>
        <Container>
            <Transition animation='pulse' duration={500} transitionOnMount={true}>
                <Segment>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name'
                            name='firstName'
                            value={firstName}
                            onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email'
                            name='email'
                            value={email}
                            onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>    
                            <label>Password</label>
                            <input placeholder='Password'
                            name='password'
                            value={password}
                            onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field control={Select} 
                        label='Camera Mount' 
                        options={options}
                        value={mount}
                        placeholder='Your Camera Mount'
                        onChange={this.updateMount} />
                        <Form.Field control={TextArea} 
                    label='About' 
                        placeholder='Tell us more about yourself...' 
                        name='about' 
                        value={about} 
                        onChange={this.handleChange}/>
                        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                </Segment>
            </Transition>
        </Container>
      </Container>
    )
  }
}