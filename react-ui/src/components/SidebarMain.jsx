import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Label, Menu, Sidebar } from 'semantic-ui-react';
import Profile from './Profile';

export default class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    };
  }

  handleItemClick = (e, { name }) => {
    const { changeViews } = this.props;
    this.setState({ activeItem: name });
    if (name !== 'progress' && name !== 'help') {
      changeViews(name);
    } else {
      changeViews('onBoard');
    }
  };

  render() {
    const { activeItem } = this.state;
    const { visible, userInformation, likeProgress } = this.props;
    return (
      <Sidebar
        as={Menu}
        animation="slide along"
        direction="left"
        inverted
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item
          name="editProfile"
          active={activeItem === 'editProfile'}
          onClick={this.handleItemClick}
        >
          <Profile userInformation={userInformation} />
        </Menu.Item>

        <Menu.Item
          name="photoSwiper"
          active={activeItem === 'photoSwiper'}
          onClick={this.handleItemClick}
        >
          <Button primary icon labelPosition="right" fluid>
            {/* <Icon small name='thumbs up outline' /> */}
            PhotoSwiper
          </Button>
        </Menu.Item>

        <Menu.Item name="progress" active={activeItem === 'progress'}>
          Progress:
          <Label
            corner="right"
            color={(() => {
              if (likeProgress <= 0) {
                return 'red';
              }
              if (likeProgress >= 30) {
                return 'green';
              }
              return 'yellow';
            })()}
          >
            {likeProgress < 30 ? Math.floor((likeProgress / 30) * 100) : 100}%
          </Label>
        </Menu.Item>

        <Menu.Item
          name="recommendations"
          active={activeItem === 'recommendations'}
          onClick={this.handleItemClick}
        >
          <Label
            className={likeProgress >= 30 ? 'heartbeat' : 'NULL'}
            corner="right"
            size="small"
            color={(() => {
              if (likeProgress <= 0) {
                return 'red';
              }
              if (likeProgress >= 30) {
                return 'green';
              }
              return 'yellow';
            })()}
          >
            {likeProgress >= 30 ? 'Ready' : 'N/A'}
          </Label>
          Next Lens:
        </Menu.Item>

        <Menu.Item
          name="likedImages"
          active={activeItem === 'likedImages'}
          onClick={this.handleItemClick}
        >
          <Label corner="right" color="blue">
            {likeProgress}
          </Label>
          Liked Images:
        </Menu.Item>

        <Menu.Item name="reviews" active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          <Label>0</Label>
          Lens Reviews:
        </Menu.Item>

        <Menu.Item
          name="suggestions"
          active={activeItem === 'suggestions'}
          onClick={this.handleItemClick}
        >
          <Icon name="camera" />
          Suggestions
        </Menu.Item>

        <Menu.Item name="help" active={activeItem === 'help'} onClick={this.handleItemClick}>
          <Icon name="help" />
          Help
        </Menu.Item>
      </Sidebar>
    );
  }
}

SidebarMain.propTypes = {
  userInformation: PropTypes.shape({
    about: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    mount: PropTypes.number,
    profileimgurl: PropTypes.string
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  likeProgress: PropTypes.number.isRequired,
  changeViews: PropTypes.func.isRequired
};
