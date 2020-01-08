import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
import { Sticky } from 'semantic-ui-react';
import styled from 'styled-components';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1b1c1d;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const NavContainer = styled.div`
  width: 100%;
  top: 0;
`;

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
        id: 0,
        mount: 1,
        profileimgurl: ''
      },
      userPhotoImpressions: []
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
    const { place, userState, userPhotoImpressions, sidebar, view } = this.state;
    if (view === 'landing') {
      return <Landing changeView={this.changeView} />;
    }
    if (view === 'login') {
      return <Login changeView={this.changeView} changeState={this.changeState} />;
    }
    if (view === 'signup') {
      return <Signup changeView={this.changeView} />;
    }
    if (view === 'homepage') {
      return (
        <HomePage
          changeView={this.changeView}
          changeState={this.changeState}
          place={place}
          userInformation={userState}
          userPhotoImpressions={userPhotoImpressions}
          sidebar={sidebar}
          reloadUser={this.checkSession}
        />
      );
    }
    return <Landing changeView={this.changeView} />;
  }

  checkSession() {
    // console.log('checking session');
    const cookies = new Cookies();
    // console.log(cookies);
    if (cookies.get('connection') !== undefined) {
      axios
        .get('/auth')
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
                    profileimgurl: data.profileimgurl
                  }
                }));
                this.changeView('homepage');
              } else if (data.error === 'NOT AUTHENTICATED') {
                console.log(
                  'Err, cookies are present but session is not, sign in again or loading page!'
                );
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
        .catch(err => {
          console.log('theres an error with auth! check below');
          console.log(err);
        });
    } else {
      console.log('No Cookies found, wont check sessions');
      this.changeState('view', 'landing');
    }
  }

  sidebar() {
    this.setState(prev => ({
      sidebar: !prev.sidebar
    }));
  }

  changeState(option, value) {
    this.setState(() => ({
      [option]: value
    }));
  }

  changeView(option) {
    this.setState(() => ({
      view: option
    }));
  }

  render() {
    const { userState, loggedIn } = this.state;
    return (
      <FlexContainer>
        <NavContainer>
          <NavBar
            sidebar={this.sidebar}
            userInformation={userState}
            changeView={this.changeView}
            loggedIn={loggedIn}
            reloadUser={this.checkSession}
            changeState={this.changeState}
          />
        </NavContainer>
        <div>{this.getView()}</div>
        <Footer />
      </FlexContainer>
    );
  }
}

export default App;
