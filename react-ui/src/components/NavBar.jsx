import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Modal } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'universal-cookie';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.title = this.title.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logIn() {
    this.props.changeView('login');
  }

  logOut() {
    axios({
      method: 'get',
      url: '/logout'
    }).then(()=> {
      const cookies = new Cookies();
      cookies.remove('connection');
      this.props.changeState('loggedIn', false);
      this.props.changeState('userState', {});
      this.props.changeState('userPhotoImpressions', []);
      this.props.changeState('place', 0);
      this.props.changeView('landing');
      console.log('success in logging out!')
    }).catch((err)=> {
      console.log('error in loggin out!')
    })
  }

  title() {
    if (this.props.loggedIn === true) {
      this.props.changeView('homepage');
    } else if (this.props.loggedIn === false) {
      this.props.changeView('landing');
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu borderless={true} size='tiny' fluid={true} >
      {this.props.loggedIn ? <Menu.Item onClick={()=>{this.props.sidebar()}}
        header
        >
        <Icon name='sidebar'/>
        </Menu.Item> : null} 

        <Menu.Item onClick={this.title}
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
            {(this.props.userInformation.firstname === '' || this.props.userInformation.firstname === undefined ) ?  '' : `${this.props.userInformation.firstname}` }
          </Menu.Item>
          <Menu.Item>
            {this.props.loggedIn ? <Button size='tiny' onClick={this.logOut} primary>Log out</Button> : <Button size='tiny' onClick={this.logIn} primary>Log in</Button> }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar;
