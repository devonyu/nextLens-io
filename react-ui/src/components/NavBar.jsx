import React, { Component } from 'react'
import { Button, Container, Header, Image, Menu, Modal } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Container fluid>
      <Menu borderless={true} size='tiny' fluid={true}>
        <Menu.Item 
        header
        >
          NextLens.io
        </Menu.Item>

        <Modal dimmer='blurring' trigger={          
          <Menu.Item
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>
        }>

          <Modal.Header>NextLens was designed and built by Devon Yu</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Image wrapped size='medium' src='https://i.imgur.com/p2JkbNN.png' circular centered/>
              <Header>I wanted to create an application to help new photographers find their next lens</Header>
              <p>Built using React/Redux, Node+Express, MongoDB + Redis, Deployed with Heroku </p>
              <p>Are you Hiring? Checkout my <a href='https://devonyu.github.io'>portfolio</a>, Download my <a href='https://devonyu.github.io/devonyuresume.pdf' download='true'>Resume!</a></p>
            </Modal.Description>
          </Modal.Content>
        </Modal>


        <Menu.Menu position='right'>
          <Menu.Item>
            <Button size='tiny' onClick={()=>console.log('log in clicked')} primary>Log-in</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </Container>
    )
  }
}
