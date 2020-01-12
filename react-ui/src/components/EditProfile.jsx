import React, { Component } from 'react';
import { Container, Card, Form, Grid, Icon, Image, Select, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { mounts, getMount, validateEmail } from './utils';
import ModalControlled from './ModalControlled';
import FullPageSpinner from './FullPageSpinner';
import defaultpicture from '../images/defaultpicture.jpg';

const InputTitle = styled.span`
  color: #1b1c1d;
`;

const SubmitButton = styled.button`
  color: white;
  font-size: 1.2em;
  background-color: #3ddb93;
  border-style: none;
  border-radius: 0.3em;
  padding: 10px;
  cursor: pointer;
  :hover,
  :focus {
    box-shadow: 0 0.5em 0.5em -0.4em #ffffff;
    transition-property: all;
    transition-duration: 0.3s;
    transform: translateY(-0.25em);
  }
`;

const FlexContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
`;

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    this.addDefaultImage = this.addDefaultImage.bind(this);
  }

  handleChange = event => {
    const { name } = event.target;
    const { value } = event.target;
    console.log(this.state.profileimgurl.includes('http') === -1);
    if (name === 'email') {
      this.setState({
        [name]: value.toLowerCase()
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  addDefaultImage = ev => {
    ev.target.src = defaultpicture;
  };

  editProfileAction = info => {
    const { userId } = this.state;
    const { reloadUser } = this.props;
    // console.log(`update userid: ${userId} with: ${info}`);
    axios({
      method: 'put',
      url: `/editprofile/${userId}`,
      data: info
    })
      .then(result => {
        // console.log('response from server after axios, result=> ', result);
        const confirmation = result.data.status;
        this.setState(() => ({
          loading: true
        }));
        if (confirmation === false) {
          this.warnUser(true, 'Failed to update User Information');
          this.setState(() => ({
            loading: false
          }));
        } else if (confirmation === true) {
          // reloadUser();
          setTimeout(() => {
            // changeViews('recommendations');
            reloadUser();
            this.setState(() => ({
              loading: false
            }));
          }, 1000);
        }
      })
      .catch(error => {
        this.warnUser(true, `Network Error: ${error}`);
        // console.log(error);
      });
  };

  handleSubmit = () => {
    const { email, firstName, mount, profileimgurl } = this.state;
    console.log(profileimgurl);
    if (!validateEmail(email)) {
      this.warnUser(true, 'Invalid Email Format');
    } else if (!firstName) {
      this.warnUser(true, 'Invalid First Name Format');
    } else if (!mount) {
      this.warnUser(true, 'Please Select a Camera Mount');
    } else if (profileimgurl.length && !profileimgurl.includes('http')) {
      this.warnUser(true, 'Prefix http or https to profile image url');
    } else if (validateEmail(email) && firstName && mount) {
      this.editProfileAction(this.state);
    }
  };

  updateMount = (e, { value }) => {
    this.setState({ mount: value });
  };

  warnUser = (open, warning) => {
    this.setState(prevState => ({ warn: open, warning }));
  };

  componentDidMount = () => {
    const { userInformation } = this.props;
    this.setState(() => ({
      loading: false,
      firstName: userInformation.firstname,
      email: userInformation.email,
      mount: userInformation.mount,
      about: userInformation.about,
      profileimgurl: userInformation.profileimgurl,
      userId: userInformation.id
    }));
  };

  render() {
    const { firstName, email, loading, mount, about, profileimgurl, warn, warning } = this.state;
    const { userInformation } = this.props;
    if (loading) {
      return <FullPageSpinner />;
    }
    return (
      <FlexContainer>
        <Container fluid>
          <ModalControlled open={warn} message={warning} close={this.warnUser} />
          <Grid columns={2} stackable padded>
            <Grid.Column stretched width={5}>
              <Card raised fluid style={{ margin: '1em' }}>
                <Image
                  onError={ev => {
                    this.addDefaultImage(ev);
                  }}
                  fluid
                  src={profileimgurl || defaultpicture}
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
                  <InputTitle>First Name</InputTitle>
                  <input
                    placeholder={userInformation.firstname}
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <InputTitle>Email</InputTitle>
                  <input
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <InputTitle>Camera Mount</InputTitle>
                <Form.Field
                  control={Select}
                  options={mounts}
                  value={mount}
                  placeholder={getMount(userInformation.mount, mounts)}
                  onChange={this.updateMount}
                />
                <InputTitle>Profile Image URL</InputTitle>
                <Form.Field
                  control={TextArea}
                  rows="2"
                  placeholder={userInformation.profileimgurl || 'N/A'}
                  name="profileimgurl"
                  value={profileimgurl}
                  onChange={this.handleChange}
                />
                <InputTitle>About</InputTitle>
                <Form.Field
                  control={TextArea}
                  rows="4"
                  placeholder={userInformation.about}
                  name="about"
                  value={about}
                  onChange={this.handleChange}
                />
                <SubmitButton type="submit" onClick={this.handleSubmit}>
                  Update Profile
                </SubmitButton>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </FlexContainer>
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
