import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/NavBar';
import PhotoLiker from './components/PhotoLiker';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'landing',
      message: null,
      fetching: true
    };
    this.changeView = this.changeView.bind(this);
    this.getView = this.getView.bind(this);
  }

  changeView(option) {
    this.setState({ view: option})
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  getView() {
    if (this.state.view === 'landing') {
      return <Landing
      changeView={ this.changeView.bind(this) }
      />
    } else if (this.state.view ==='login') {
      return <Login
      changeView={ this.changeView.bind(this) }
      />
    } else if (this.state.view ==='signup') {
      return <Signup
      changeView={ this.changeView.bind(this) }
      />
    }else if (this.state.view ==='photoliker') {
      return <PhotoLiker
      changeView={ this.changeView.bind(this) }
      />
    }
  }

  render() {
    return (
        <div>{ this.getView() }</div>
    );
  }
}

export default App;
