import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
import { Sticky } from 'semantic-ui-react';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      view: '',
      loggedIn: false,
      place: 0,
      userState: {
        about: '',
        email: '',
        firstname: '',
        id: '',
        mount: '',
        profileimgurl: '',
      },
      userPhotoImpressions: [],
    };
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
    this.sidebar = this.sidebar.bind(this);
    this.checkSession = this.checkSession.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  getView() {
    if (this.state.view === 'landing') {
      return (
        <Landing
          changeView={this.changeView}
        />
      );
    } if (this.state.view === 'login') {
      return (
        <Login
          changeView={this.changeView}
          changeState={this.changeState}
        />
      );
    } if (this.state.view === 'signup') {
      return (
        <Signup
          changeView={this.changeView}
        />
      );
    } if (this.state.view === 'homepage') {
      return (
        <HomePage
          changeView={this.changeView}
          changeState={this.changeState}
          place={this.state.place}
          userInformation={this.state.userState}
          userPhotoImpressions={this.state.userPhotoImpressions}
          sidebar={this.state.sidebar}
          reloadUser={this.checkSession}
        />
      );
    }
    return (
      <Landing
        changeView={this.changeView}
      />
    );
  }

  checkSession() {
    // console.log('checking session');
    const cookies = new Cookies();
    // console.log(cookies);
    if (cookies.get('connection') !== undefined) {
      axios.get('/auth')
        .then(({ data }) => {
        // console.log('Auth: ', data);
          try {
            if (data) {
            // console.log(data);
            // Implement Redux in future to make this cleaner
              if (data.id !== undefined) {
                console.log('Cookies found and Session matches in Redis!');
                this.setState(() => ({
                  loggedIn: true,
                  place: data.place,
                  userState: {
                    about: data.about,
                    email: data.email,
                    firstname: data.firstname,
                    id: data.id,
                    place: data.place,
                    mount: data.mount,
                    profileimgurl: data.profileimgurl,
                  },
                }));
                this.changeView('homepage');
              } else if (data.error === 'NOT AUTHENTICATED') {
                console.log('Err, cookies are present but session is not, sign in again or loading page!');
                this.changeView('landing');
              }
            } else {
            // Signing in fails, go back to landing page
              console.log('Cookies found, but Session is not valid');
              this.changeView('landing');
            }
          } catch (err) {
            console.log('caught err in setting state after auth: ', err);
            this.changeView('landing');
          }
        })
        .catch((err) => {
          console.log('theres an error with auth! check below');
          console.log(err);
        });
    } else {
      console.log('No Cookies found, wont check sessions');
      this.changeState('view', 'landing');
    }
  }

  sidebar() {
    // this.setState({ sidebar: !this.state.sidebar });
    this.setState((prev) => {
      return {
        sidebar: !prev.sidebar,
      };
    });
  }

  changeState(option, value) {
    this.setState(() => ({
      [option]: value,
    }));
  }

  changeView(option) {
    this.setState(() => ({
      view: option,
    }));
  }

  render() {
    // console.log('state at top   <>', this.state)
    return (
      <div id="container">
        <div id="navv">
          <Sticky>
            <NavBar
              sidebar={this.sidebar}
              userInformation={this.state.userState}
              changeView={this.changeView}
              loggedIn={this.state.loggedIn}
              reloadUser={this.checkSession}
              changeState={this.changeState}
            />
          </Sticky>
        </div>
        <div id="content">{ this.getView() }</div>
        <Footer />
      </div>
    );
  }
}

export default App;
