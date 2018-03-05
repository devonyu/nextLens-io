import React, { Component } from 'react';
import './App.css';
import PhotoLiker from './components/PhotoLiker';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'landing',
      message: null,
      fetching: true,
      loggedIn: false,
      userId: null,
      userName: '',
      mount: '',
    };
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
  }

  changeView(option) {
    this.setState({ view: option})
  }

  changeState(option, value) {
    this.setState({ [option]: value})
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
      changeState={ this.changeState }
      />
    } else if (this.state.view ==='signup') {
      return <Signup
      changeView={ this.changeView.bind(this) }
      />
    } else if (this.state.view ==='photoliker') {
      return <PhotoLiker
      changeView={ this.changeView.bind(this) }
      />
    } else if (this.state.view ==='homepage') {
      return <HomePage
      changeView={ this.changeView.bind(this) }
      userId={ this.state.userId }
      userName={ this.state.userName }
      mount={ this.state.mount }
      />
    }
  }

  render() {
    return (
        <div>
          <div> {<NavBar
            view={this.state.view} 
            changeView={this.changeView} 
            userName={this.state.userName}
            loggedIn={this.state.loggedIn}
            changeState={this.changeState}/> } 
          </div>
          <div>{ this.getView() }</div>
        </div>
    );
  }
}

export default App;
