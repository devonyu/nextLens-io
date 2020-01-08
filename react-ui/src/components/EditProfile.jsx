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
import PropTypes from 'prop-types';
import axios from 'axios';
import { mounts, getMount, validateEmail } from './utils';
import ModalControlled from './ModalControlled';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      mount: '',
      about: '',
      profileimgurl: '',
      userId: '',
      warn: false,
      warning: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMount = this.updateMount.bind(this);
    this.editProfileAction = this.editProfileAction.bind(this);
    this.warnUser = this.warnUser.bind(this);
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
    // console.log(`update userid: ${userId} with: ${info}`);
    axios({
      method: 'put',
      url: `/editprofile/${userId}`,
      data: info
    })
      .then(result => {
        // console.log('response from server after axios, result=> ', result);
        const confirmation = result.data.status;
        if (confirmation === false) {
          this.warnUser(true, 'Failed to update User Information');
        } else if (confirmation === true) {
          reloadUser();
          setTimeout(() => {
            changeViews('recommendations');
          }, 1000);
        }
      })
      .catch(error => {
        this.warnUser(true, `Network Error: ${error}`);
        // console.log(error);
      });
  };

  handleSubmit = () => {
    const { email, firstName, mount } = this.state;
    if (validateEmail(email) && firstName && mount) {
      this.editProfileAction(this.state);
    } else if (!validateEmail(email)) {
      this.warnUser(true, 'Invalid Email Format');
    } else if (!firstName) {
      this.warnUser(true, 'Invalid First Name Format');
    } else if (!mount) {
      this.warnUser(true, 'Please Select a Camera Mount');
    }
  };

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  };

  warnUser = (open, warning) => {
    this.setState(prevState => ({ warn: open, warning }));
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
    const { firstName, email, mount, about, profileimgurl, warn, warning } = this.state;
    const { userInformation } = this.props;
    return (
      <Container fluid>
        <ModalControlled open={warn} message={warning} close={this.warnUser} />
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
                <label style={{ color: 'white' }}>First Name</label>
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

EditProfile.propTypes = {
  userInformation: PropTypes.shape({
    about: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    mount: PropTypes.number,
    profileimgurl: PropTypes.string
  }).isRequired,
  reloadUser: PropTypes.func.isRequired,
  changeViews: PropTypes.func.isRequired
};
