import React, { useState } from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const NavBar = inputProps => {
  const [icon, setIcon] = useState('sb');
  const { changeState, changeView, clearState, loggedIn, sidebar, userInformation } = inputProps;

  const alterIcon = () => {
    icon === 'sb' ? setIcon('leftArrow') : setIcon('sb');
    sidebar();
  };

  const logOut = () => {
    axios({
      method: 'get',
      url: '/logout'
    })
      .then(() => {
        const cookies = new Cookies();
        cookies.remove('connection');
        clearState();
        console.log('success in logging out!');
      })
      .then(() => {
        changeView('landing');
      })
      .catch(err => {
        console.log('error in loggin out => ', err);
      });
  };

  const toggleHome = () => {
    if (loggedIn) {
      changeView('homepage');
    } else if (!loggedIn) {
      changeView('landing');
    }
  };

  return (
    <Menu borderless size="tiny" fluid>
      {loggedIn ? (
        <Menu.Item onClick={alterIcon} header>
          {icon === 'sb' ? <Icon name="sidebar" /> : <Icon name="chevron left" />}
        </Menu.Item>
      ) : (
        ''
      )}

      <Menu.Item onClick={toggleHome} header>
        NextLens.io
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          {userInformation !== undefined && userInformation.firstname === ''
            ? ''
            : `${userInformation.firstname}`}
        </Menu.Item>
        <Menu.Item>
          {loggedIn ? (
            <Button size="tiny" onClick={logOut} primary>
              Log out
            </Button>
          ) : (
            <Button size="tiny" onClick={() => changeView('login')} primary>
              Log in
            </Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;

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
