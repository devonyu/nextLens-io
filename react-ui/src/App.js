import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
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
      userState: {
        about: '',
        email: '',
        firstname: '',
        id: '',
        mount: '',
        profileimgurl: ''
      },
      userPhotoImpressions: []
    };
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
  }

  changeView(option) {
    console.log(this.state);
    this.setState((prevState, props) => {
      return {
          view: option
      };
    });
  }

  changeState(option, value) {
    this.setState((prevState, props) => {
      return {
          [option]: value
      };
    });
  }

  componentDidMount() {
    //check here for sessions
    console.log('app mounted')
    axios.get('/auth')// or /auth
    .then(({ data }) => {
      console.log('loaded top level for auth==>', data);
      try {
        if (data) {
          console.log('user info found:', data)
          this.setState((prevState, props) => {
            return {
                loggedIn: true,
                userState: {
                  about: data.about,
                  email: data.email,
                  firstname: data.firstname,
                  id: data.id,
                  mount: data.mount,
                  profileimgurl: data.profileimgurl
                }
              }
            });
          this.changeView('homepage')
        }
      } 
      catch(err) {
        this.changeView('landing')
      }

    })
    .catch((err)=>{
      console.log(err);
      alert(err);
    })
  }

  getView() {
    if (this.state.view === 'landing') {
      return <Landing
      changeView={ this.changeView }
      />
    } else if (this.state.view ==='login') {
      return <Login
      changeView={ this.changeView }
      changeState={ this.changeState }
      />
    } else if (this.state.view ==='signup') {
      return <Signup
      changeView={ this.changeView }
      />
    } else if (this.state.view ==='photoliker') {
      return <PhotoLiker
      changeView={ this.changeView }
      changeState={this.changeState}
      userInformation={ this.state.userState }
      userPhotoImpressions={ this.state.userPhotoImpressions }
      />
    } else if (this.state.view ==='homepage') {
      return <HomePage
      changeView={ this.changeView }
      changeState={this.changeState}
      userInformation={ this.state.userState }
      userPhotoImpressions={ this.state.userPhotoImpressions }
      />
    }
  }

  render() {
    return (
        <div className="container">
          <div> { <NavBar
            userInformation={this.state.userState}
            changeView={this.changeView} 
            loggedIn={this.state.loggedIn}
            changeState={this.changeState}/> } 
          </div>
          <div>{ this.getView() }</div>
        </div>
    );
  }
}

export default App;
