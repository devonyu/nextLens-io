import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Sticky } from 'semantic-ui-react';

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
        profileimgurl: ''
      },
      userPhotoImpressions: []
    };
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
    this.sidebar = this.sidebar.bind(this);
  }

  changeView(option) {
    this.setState(() => {
      return {
          view: option
      };
    });
  }

  changeState(option, value) {
    this.setState(() => {
      return {
          [option]: value
      };
    });
  }

  sidebar() {
    this.setState({sidebar: !this.state.sidebar});
  }

  checkSession() {
    console.log('checking session');
    const cookies = new Cookies();
    console.log(cookies);
    if (cookies.get('connection') !== undefined) {
      axios.get('/auth')
      .then(({ data }) => {
        //console.log('Auth: ', data);
        try {
          if (data) {
            //Implement Redux in future to make this cleaner
            if (data.id !== undefined) {
              console.log('Cookies found and Session matches in Redis!')
              this.setState(() => {
                return {
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
                  }
                });
                this.changeView('homepage');
            }
          } else {
            //Signing in fails, go back to landing page
            console.log('Cookies found, but Session is not valid');
            this.changeView('landing');
          }
        } 
        catch(err) {
          console.log('caught err in setting state after auth: ', err)
          this.changeView('landing');
        }
  
      })
      .catch((err)=>{
        console.log('theres an error with auth! check below');
        console.log(err);
      })
    } else {
      console.log('No Cookies found, wont check sessions');
      this.changeState('view', 'landing');
    }
  }

  componentDidMount() {
    this.checkSession();
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
    } else if (this.state.view ==='homepage') {
      return <HomePage
      changeView={ this.changeView }
      changeState={ this.changeState }
      place = { this.state.place } 
      userInformation={ this.state.userState }
      userPhotoImpressions={ this.state.userPhotoImpressions }
      sidebar={ this.state.sidebar }
      />
    }
  }

  render() {
    //console.log('state at top   <>', this.state)
    return (
        <div id="container">
          <div id='navv'>
            <Sticky onUnstick={()=>{console.log(
              'unstuck.. it wont go lower, why?'
            )}}>
              <NavBar
                sidebar={ this.sidebar } 
                userInformation={ this.state.userState }
                changeView={ this.changeView } 
                loggedIn={ this.state.loggedIn }
                changeState={ this.changeState }/>
            </Sticky>
          </div>
          <div id="content">{ this.getView() }</div>
          <Footer />
        </div>
    );
  }
}

export default App;
