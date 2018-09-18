import React, { Component } from 'react'
import { Button, Input, Label, Menu } from 'semantic-ui-react'
import Profile from './Profile';

export default class SidebarMain extends Component {
  state = { activeItem: 'pf' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='pf' active={activeItem === 'pf'} onClick={this.handleItemClick}>
          {/* <Label color='teal'>1</Label> */}
          <Profile userInformation={this.props.userInformation}>
          </Profile>
        </Menu.Item>

        <Menu.Item name='pl' active={activeItem === 'pl'} onClick={this.handleItemClick}>
        <Button primary>PhotoLiker</Button>
        </Menu.Item>

        <Menu.Item name='pg' active={activeItem === 'pg'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress}/30</Label>
          Current Progress:
        </Menu.Item>

        <Menu.Item name='rec' active={activeItem === 'rec'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress >= 30 ? "Ready!" : "N/A"}</Label>
          Recommendations:
        </Menu.Item>

        <Menu.Item name='liked' active={activeItem === 'liked'} onClick={this.handleItemClick}>
          <Label>{this.props.likeProgress}</Label>
          Liked Images:
        </Menu.Item>

        <Menu.Item name='rev' active={activeItem === 'rev'} onClick={this.handleItemClick}>
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