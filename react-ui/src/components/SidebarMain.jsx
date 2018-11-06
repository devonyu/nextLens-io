import React, { Component } from 'react'
import { Button, Icon, Label, Menu, Sidebar } from 'semantic-ui-react'
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
        console.log('props => ', this.props);
        return (

            <Sidebar
            as={Menu}
            animation='slide along'
            direction='left'
            //fluid
            //attached='bottom'
            //compact
            inverted
            vertical
            onHide={this.props.onHide}
            visible={this.props.visible}
            width='thin'
            >

            <Menu.Item name='editProfile' active={activeItem === 'editProfile'} onClick={this.handleItemClick}>
                <Profile userInformation={this.props.userInformation}>
                </Profile>
            </Menu.Item>
    
            <Menu.Item name='photoliker' active={activeItem === 'photoliker'} onClick={this.handleItemClick}>
                <Button primary icon labelPosition='right' fluid>
                    {/* <Icon small name='thumbs up outline' /> */}
                    PhotoLiker
                </Button>
            </Menu.Item>

            <Menu.Item name='progress' active={activeItem === 'progress'} onClick={this.handleItemClick}>
                <Label corner='right' color={this.state.ready}>{this.props.likeProgress < 30 ? Math.floor((this.props.likeProgress / 30) * 100) : 100}%</Label>
                Progress:
            </Menu.Item>

            <Menu.Item name='recommendations' active={activeItem === 'recommendations'} onClick={this.handleItemClick}>
                <Label corner='right' size='small' color={this.state.ready}>{this.props.likeProgress >= 30 ? "Ready" : "N/A"}</Label>
                Next Lens:
            </Menu.Item>

            <Menu.Item name='likedImages' active={activeItem === 'likedImages'} onClick={this.handleItemClick}>
                <Label corner='right' color='blue' >{this.props.likeProgress}</Label>
                Liked Images:
            </Menu.Item>

            <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
                <Label>0</Label>
                Lens Reviews:
            </Menu.Item>

            <Menu.Item name='suggestions' active={activeItem === 'suggestions'} onClick={this.handleItemClick}>
            <Icon name='camera' />
                Suggestions
            </Menu.Item>

            </Sidebar>
        )
    }
}
