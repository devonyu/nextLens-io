import React, { Component } from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'sb'
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.title = this.title.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  alterIcon = () => {
    const { sidebar } = this.props;
    const { icon } = this.state;
    sidebar();
    icon === 'sb'
      ? this.setState(() => ({
          icon: 'leftarrow'
        }))
      : this.setState(() => ({
          icon: 'sb'
        }));
  };

  logIn() {
    const { changeView } = this.props;
    changeView('login');
  }

  logOut() {
    const { changeState, changeView } = this.props;
    axios({
      method: 'get',
      url: '/logout'
    })
      .then(() => {
        const cookies = new Cookies();
        cookies.remove('connection');
        changeState('loggedIn', false);
        changeState('userState', {});
        changeState('userPhotoImpressions', []);
        changeState('place', 0);
        changeView('landing');
        console.log('success in logging out!');
      })
      .catch(err => {
        console.log('error in loggin out => ', err);
      });
  }

  title() {
    const { loggedIn, changeView } = this.props;
    if (loggedIn === true) {
      changeView('homepage');
    } else if (loggedIn === false) {
      changeView('landing');
    }
  }

  render() {
    const { activeItem, icon } = this.state;
    const { loggedIn, userInformation } = this.props;

    return (
      <Menu borderless size="tiny" fluid>
        {loggedIn ? (
          <Menu.Item onClick={this.alterIcon} header>
            {icon === 'sb' ? <Icon name="sidebar" /> : <Icon name="chevron left" />}
          </Menu.Item>
        ) : (
          ''
        )}

        <Menu.Item onClick={this.title} header>
          NextLens.io
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {userInformation.firstname === '' || userInformation.firstname === undefined
              ? ''
              : `${userInformation.firstname}`}
          </Menu.Item>
          <Menu.Item>
            {loggedIn ? (
              <Button size="tiny" onClick={this.logOut} primary>
                Log out
              </Button>
            ) : (
              <Button size="tiny" onClick={this.logIn} primary>
                Log in
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

NavBar.propTypes = {
  sidebar: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userInformation: PropTypes.shape({
    about: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    mount: PropTypes.number,
    profileimgurl: PropTypes.string
  }).isRequired
};
