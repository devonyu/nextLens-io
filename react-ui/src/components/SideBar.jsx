import React, { Component } from 'react'
import { Button, Icon, Input, Label, Menu } from 'semantic-ui-react'
import Profile from './Profile';

export default class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      progress: 0
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name !== 'progress') {
      this.props.changeViews(name);
    }
  }

  updateProgress() {
    if (this.state.progress < 30) {
      this.setState((state, props) => ({
        progress: state.progress + 1
      }));
    }
    console.log('progress increased in sidebar');
  }

  componentDidUpdate(prevProps) {
    if(prevProps.likeProgress !== this.props.likeProgress){
      this.setState({          
        progress: this.props.likeProgress.length
      });
    }
  }

  componentDidMount() {
    console.log('after mounting=>',this.props.likeProgress)
    if (this.props.likeProgress) {
      this.setState((state) => ({
        progress: this.props.likeProgress.length
      }));
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
          <Label onClick={this.updateProgress.bind(this)}>{Math.floor((this.state.progress / 30) * 100)}%</Label>
          Current Progress:
        </Menu.Item>

        <Menu.Item name='recommendations' active={activeItem === 'recommendations'} onClick={this.handleItemClick}>
          <Label>{this.state.progress >= 30 ? "Ready" : "N/A"}</Label>
          Recommendations:
        </Menu.Item>

        <Menu.Item name='likedImages' active={activeItem === 'likedImages'} onClick={this.handleItemClick}>
          <Label>{this.state.progress}</Label>
          Liked Images:
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          <Label>0</Label>
          Lens Reviews:
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search NextLens' />
        </Menu.Item>
      </Menu>
    )
  }
}