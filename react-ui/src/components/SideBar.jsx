import React, { Component } from 'react'
import { Button, Icon, Label, Menu } from 'semantic-ui-react'
import Profile from './Profile';

export default class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      ready: 'red'
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name !== 'progress') {
      this.props.changeViews(name);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.likeProgress !== this.props.likeProgress) {
      if (this.props.likeProgress < 5) {
        this.setState(() => {
          return {
            ready: 'red'
          }
        })
      } else if (this.props.likeProgress > 5 && this.props.likeProgress < 30 ) {
        this.setState(() => {
          return {
            ready: 'yellow'
          }
        })
      } else if (this.props.likeProgress >= 30) {
        this.setState(() => {
          return {
            ready: 'green'
          }
        })
      }
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='editProfile' active={activeItem === 'editProfile'} onClick={this.handleItemClick}>
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
          <Label color={this.state.ready}>{this.props.likeProgress < 30 ? Math.floor((this.props.likeProgress / 30) * 100) : 100}%</Label>
          Current Progress:
        </Menu.Item>

        <Menu.Item name='recommendations' active={activeItem === 'recommendations'} onClick={this.handleItemClick}>
          <Label size='small' color={this.state.ready}>{this.props.likeProgress >= 30 ? "Ready" : "N/A"}</Label>
          Your Next Lens:
        </Menu.Item>

        <Menu.Item name='likedImages' active={activeItem === 'likedImages'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress}</Label>
          Liked Images:
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          <Label>0</Label>
          Lens Reviews:
        </Menu.Item>

        <Menu.Item name='suggestions' active={activeItem === 'suggestions'} onClick={this.handleItemClick}>
          Suggestions/Feedback
        </Menu.Item>

        {/* <Menu.Item>
          <Input icon='search' placeholder='Search NextLens' />
        </Menu.Item> */}
      </Menu>
    )
  }
}