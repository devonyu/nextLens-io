import React, { Component } from 'react';
import { Button, Container, Card, Form, Grid, Icon, Image, Select, TextArea } from 'semantic-ui-react';
import { mounts } from './utils.js';
import { mounts as options } from './utils.js';
import axios from 'axios';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            email: '',
            mount: '',
            about: '',
            profileimgurl: '',
            userId: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateMount = this.updateMount.bind(this);
        this.editProfileAction = this.editProfileAction.bind(this);
    }

    getMount(mountNumber) {
        for (let key of mounts) {
            if (key.value === mountNumber) {
                return key.text;
            }
        }
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

    editProfileAction = (info) => {
        console.log(`update userid: ${this.state.userId} with: ${info}`);
        axios({
          method: 'put',
          url: `/editprofile/${this.state.userId}`,
          data: info
        })
        .then((result) => {
            console.log('response from server after axios, result=> ', result)
            let confirmation = result.data.status;
            if (confirmation === false) {
              alert('Failed update user profile');
            } else if (confirmation === true){
              this.props.reloadUser();
              this.props.changeViews('recommendations');
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
        if (validateEmail(this.state.email) && this.state.firstName && this.state.mount) {
            this.editProfileAction(this.state);
        } else if (!validateEmail(this.state.email)) {
            alert('Invalid Email Format');
        } else if (!this.state.firstName) {
            alert('First Name required');
        } else if (!this.state.mount) {
            alert('Please Select a Camera Mount');
        }
    }

    updateMount = (e, { value }) => {
        this.setState({ mount: value });
    }

    componentWillMount = () => {
        this.setState(()=>{
            return {
                firstName: this.props.userInformation.firstname,
                email: this.props.userInformation.email,
                mount: this.props.userInformation.mount,
                about: this.props.userInformation.about,
                profileimgurl: this.props.userInformation.profileimgurl,
                userId: this.props.userInformation.id
            }
        })
    }

    render() {
        const { firstName, email, mount, about, profileimgurl} = this.state;
        return(
                <Container fluid>
                    <Grid columns={2} stackable padded>
                        <Grid.Column stretched width={5}>
                            <Card raised fluid>
                                <Image fluid src={this.state.profileimgurl || 'https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg'} rounded/>
                                <Card.Content>
                                    <Card.Header>{this.state.firstName}</Card.Header>
                                    <Card.Meta>{this.getMount(this.state.mount)}</Card.Meta>
                                    <Card.Description>{this.state.about}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='camera retro' />
                                    Owns X lens
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column stretched>
                            <Form>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input placeholder={this.props.userInformation.firstname}
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
                                <Form.Field control={Select} 
                                    label='Camera Mount' 
                                    options={options}
                                    value={mount}
                                    placeholder={this.getMount(this.props.userInformation.mount)}
                                    onChange={this.updateMount} />
                                <Form.Field control={TextArea} 
                                    label='Profile Image URL' 
                                    placeholder={this.props.userInformation.profileimgurl || 'N/A'}
                                    name='profileimgurl' 
                                    value={profileimgurl} 
                                    onChange={this.handleChange} />
                                <Form.Field control={TextArea} 
                                    label='About' 
                                    placeholder={this.props.userInformation.about} 
                                    name='about' 
                                    value={about} 
                                    onChange={this.handleChange}/>
                            <Button type='submit' onClick={this.handleSubmit}>Update Profile</Button>
                        </Form>
                        </Grid.Column>

                    </Grid>
                </Container>
        )
    }
}