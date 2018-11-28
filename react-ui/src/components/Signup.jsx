import React, { Component } from 'react'
import { Button, Container, Form, TextArea, Transition, Segment, Select } from 'semantic-ui-react'
import axios from 'axios';
// const options = require('./utils.js');
import { mounts as options } from './utils.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        email: '',
        password: '',
        mount: '',
        about: '',
        profileimgurl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMount = this.updateMount.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
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

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  }

  signupNewUser = (info) => {
      axios({
        method: 'post',
        url: '/signup',
        data: info
      })
      .then((result) => {
          console.log('response from server after axios')
          if (result.data.status === false) {
            alert('Email is already signed up!');
          } else if (result.data.status === true){
            alert(`${info.email} Signed up!`);
            this.props.changeView('landing');
          }
      })
      .catch((error) => {
        console.log('error inside signup Axios failed')
        console.log(error);
      });
  }

  handleSubmit = () => {
    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (validateEmail(this.state.email) && this.state.password.length >= 5 && this.state.firstName && this.state.mount) {
        //error in about with ' in string. Fix bug within DB
        console.log(this.state)
        this.signupNewUser(this.state);
    } else if (!validateEmail(this.state.email)) {
        alert('Invalid Email Format');
    } else if (this.state.password.length < 5) {
        alert('Password must be at least 5 characters');
    } else if (!this.state.firstName) {
        alert('First Name required');
    } else if (!this.state.mount) {
        alert('Please Select a Camera Mount');
    }
  }

  render() {
    const { firstName, email, password, mount, about, profileimgurl} = this.state;
    return(
      <Container fluid>
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
                            type='password'
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
                            label='Profile Image URL' 
                            placeholder='Copy your Profile image url here' 
                            name='profileimgurl' 
                            value={profileimgurl} 
                            onChange={this.handleChange} />
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
    )
  }
}