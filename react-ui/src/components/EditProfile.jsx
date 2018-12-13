import React, { Component } from 'react';
import {
  Button,
  Container,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Select,
  TextArea
} from 'semantic-ui-react';
import axios from 'axios';
import { mounts, getMount } from './utils';

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

  handleChange = event => {
    const { name } = event.target;
    const { value } = event.target;
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

  editProfileAction = info => {
    const { userId } = this.state;
    const { reloadUser, changeViews } = this.props;
    console.log(`update userid: ${userId} with: ${info}`);
    axios({
      method: 'put',
      url: `/editprofile/${userId}`,
      data: info
    })
      .then(result => {
        console.log('response from server after axios, result=> ', result);
        const confirmation = result.data.status;
        if (confirmation === false) {
          alert('Failed update user profile');
        } else if (confirmation === true) {
          reloadUser();
          setTimeout(() => {
            changeViews('recommendations');
          }, 1000);
        }
      })
      .catch(error => {
        console.log('error inside signup Axios failed');
        console.log(error);
      });
  };

  handleSubmit = () => {
    const { email, firstName, mount } = this.state;
    function validateEmail(emailInput) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(emailInput).toLowerCase());
    }
    if (validateEmail(email) && firstName && mount) {
      this.editProfileAction(this.state);
    } else if (!validateEmail(email)) {
      alert('Invalid Email Format');
    } else if (!firstName) {
      alert('First Name required');
    } else if (!mount) {
      alert('Please Select a Camera Mount');
    }
  };

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  };

  componentWillMount = () => {
    const { userInformation } = this.props;
    this.setState(() => ({
      firstName: userInformation.firstname,
      email: userInformation.email,
      mount: userInformation.mount,
      about: userInformation.about,
      profileimgurl: userInformation.profileimgurl,
      userId: userInformation.id
    }));
  };

  render() {
    const { firstName, email, mount, about, profileimgurl } = this.state;
    const { userInformation } = this.props;
    return (
      <Container fluid>
        <Grid columns={2} stackable padded>
          <Grid.Column stretched width={5}>
            <Card raised fluid>
              <Image
                fluid
                src={
                  profileimgurl ||
                  'https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg'
                }
                rounded
              />
              <Card.Content>
                <Card.Header>{firstName}</Card.Header>
                <Card.Meta>{getMount(mount, mounts)}</Card.Meta>
                <Card.Description>{about}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="camera retro" />
                Owns X lens
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column stretched>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input
                  placeholder={userInformation.firstname}
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field
                control={Select}
                label="Camera Mount"
                options={mounts}
                value={mount}
                placeholder={getMount(userInformation.mount, mounts)}
                onChange={this.updateMount}
              />
              <Form.Field
                control={TextArea}
                label="Profile Image URL"
                placeholder={userInformation.profileimgurl || 'N/A'}
                name="profileimgurl"
                value={profileimgurl}
                onChange={this.handleChange}
              />
              <Form.Field
                control={TextArea}
                label="About"
                placeholder={userInformation.about}
                name="about"
                value={about}
                onChange={this.handleChange}
              />
              <Button type="submit" onClick={this.handleSubmit}>
                Update Profile
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
