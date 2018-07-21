import React, { Component } from 'react'
import { Button, Header, Image, Menu, Modal } from 'semantic-ui-react'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Logged-out',
    }
    this.logIn = this.logIn.bind(this);
    this.landing = this.landing.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logIn() {
    if (this.state.status === 'Logged In' && this.props.view !== 'login') {
      this.props.changeState('loggedIn', false);
      this.props.changeState('userName', '');
      this.props.changeState('userId', null);
      this.setState({status: 'Logged-out'})
      this.props.changeView('landing');
    } else if (this.state.status === 'Logged-out') {
      this.setState({status: 'Logged In'})
      this.props.changeView('login');
    }
  }

  landing() {
    this.props.changeView('landing');
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu borderless={true} size='tiny' fluid={true}>
        <Menu.Item onClick={this.landing}
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
        }closeIcon>
          <Modal.Header>Designed and Developed by Devon Yu</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Image id='About' wrapped size='medium' src='https://github.com/devonyu/devonyu.github.io/blob/master/images/pf2.jpg?raw=true' circular centered/>
              <Header>I wanted to create an application to help new photographers find their next lens</Header>
              <p>Built using React, Node+Express, PostgreSQL, Deployed with Heroku</p>
              <p>Are you Hiring? Checkout my <a href='https://devonyu.github.io'>portfolio</a>, Download my <a href='https://devonyu.github.io/devonyuresume.pdf' download='true'>Resume!</a></p>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Menu.Menu position='right'>
          <Menu.Item>
            {this.props.userName? `Welcome ${this.props.userName}` : '' }
          </Menu.Item>
          <Menu.Item>
            <Button size='tiny' onClick={this.logIn} primary>{this.props.loggedIn === false? 'Log in' : 'Log out'}</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;
