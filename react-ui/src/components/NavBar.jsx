import React, { Component } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Container fluid>
      <Menu borderless='true' size='small' fluid='true' stackable='true'>
        <Menu.Item 
        header
        >
          NextLens.io
        </Menu.Item>

        <Menu.Item
          name='editorials'
          active={activeItem === 'cameras'}
          onClick={this.handleItemClick}
        >
          Cameras
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'lenses'}
          onClick={this.handleItemClick}
        >
          Lenses
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>


          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>

          <Menu.Item>
            <Button>Log-in</Button>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
      </Container>
    )
  }
}
