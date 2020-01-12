import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FullPageSpinner from './components/FullPageSpinner';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1b1c1d;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  position: relative;
`;

const NavContainer = styled.div`
  width: 100%;
  top: 0;
  position: fixed;
  box-sizing: border-box;
  height: 43px;
  z-index: 9999;
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: calc(100%vh - 73px);
  width: 100vw;
  position: relative;
  margin-bottom: 30px;
  margin-top: 43px;
  overflow: hidden;
`;

const DEFAULTSTATE = {
  loading: true,
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULTSTATE;
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkSession();
    }, 250);
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
      // console.log('top level getview homepage');
      return (
        <HomePage
          changeView={this.changeView}
          changeState={this.changeState}
          place={place}
          userInformation={userState}
          userPhotoImpressions={userPhotoImpressions}
          sidebar={sidebar}
          toggleSidebar={this.toggleSidebar}
          reloadUser={this.checkSession}
        />
      );
    }
    return <Landing changeView={this.changeView} />;
  }

  checkSession() {
    const cookies = new Cookies();
    if (cookies.get('connection') !== undefined) {
      axios
        .get('/auth')
        .then(({ data }) => {
          try {
            if (data) {
              if (data.id !== undefined) {
                console.log('Cookies found and Session matches in Redis!');
                setTimeout(() => {
                  this.setState(() => ({
                    loggedIn: true,
                    place: data.place,
                    loading: false,
                    view: 'homepage',
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
                }, 250);
              } else if (data.error === 'NOT AUTHENTICATED') {
                console.log(
                  'Err, cookies are present but session is not, sign in again or loading page!'
                );
                setTimeout(() => {
                  this.changeView('landing');
                }, 500);
              }
            } else {
              // Signing in fails, go back to landing page
              console.log('Cookies found, but Session is not valid');
              setTimeout(() => {
                this.setState(() => ({
                  loading: false,
                  view: 'landing'
                }));
              }, 500);
            }
          } catch (err) {
            console.log('caught err in setting state after auth: ', err);
            this.setState(() => ({
              loading: false,
              view: 'landing'
            }));
          }
        })
        .catch(err => {
          console.log('theres an error with auth! check below');
          console.log(err);
          this.setState(() => ({
            loading: false,
            view: 'landing'
          }));
        });
    } else {
      console.log('No Cookies found, wont check sessions');
      this.setState(() => ({
        loading: false,
        view: 'landing'
      }));
    }
  }

  clearState() {
    this.setState(prev => ({
      ...DEFAULTSTATE,
      loading: false
    }));
  }

  toggleSidebar() {
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
    const { loading, loggedIn, userState } = this.state;
    if (loading) {
      return <FullPageSpinner />;
    }
    return (
      <AppContainer>
        <NavContainer>
          <NavBar
            sidebar={this.toggleSidebar}
            userInformation={userState}
            changeView={this.changeView}
            loggedIn={loggedIn}
            reloadUser={this.checkSession}
            changeState={this.changeState}
            clearState={this.clearState}
          />
        </NavContainer>
        <ViewContainer>{this.getView()}</ViewContainer>
        <Footer changeView={this.changeView} />
      </AppContainer>
    );
  }
}

export default App;
