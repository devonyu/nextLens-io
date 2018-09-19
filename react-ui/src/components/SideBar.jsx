import React, { Component } from 'react'
import { Button, Icon, Input, Label, Menu } from 'semantic-ui-react'
import Profile from './Profile';

export default class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name !== 'progress') {
      this.props.changeViews(name);
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='editProfile' active={activeItem === 'editProfile'} onClick={this.handleItemClick} rounded>
          {/* <Label color='teal'>1</Label> */}
          <Profile userInformation={this.props.userInformation}>
          </Profile>
        </Menu.Item>

        <Menu.Item name='photoliker' active={activeItem === 'photoliker'} onClick={this.handleItemClick}>
        <Button fluid primary icon labelPosition='right'>
          <Icon name='thumbs up outline' />
          PhotoLiker
        </Button>
        </Menu.Item>

        <Menu.Item name='progress' active={activeItem === 'progress'} onClick={this.handleItemClick}>
          <Label>{Math.floor((this.props.likeProgress / 30) * 100)}%</Label>
          Current Progress:
        </Menu.Item>

        <Menu.Item name='recommendations' active={activeItem === 'recommendations'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress >= 30 ? "Ready!" : "N/A"}</Label>
          Recommendations:
        </Menu.Item>

        <Menu.Item name='likedImages' active={activeItem === 'likedImages'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress >= 0 ? this.props.likeProgress : 0 }</Label>
          Liked Images:
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Lens Reviews:
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search NextLens' />
        </Menu.Item>
      </Menu>
    )
  }
}