import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
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
      loggedIn: false,
      userState: {
        about: '',
        email: '',
        firstname: '',
        id: '',
        mount: '',
        profileimgurl: ''
      },
      userPhotoImpressions: {
        likes: [],
        dislikes: []
      }
    };
    this.changeView = this.changeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getView = this.getView.bind(this);
  }

  changeView(option) {
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
    const cookies = new Cookies();
    if (cookies.get('connection') !== undefined) {
      axios.get('/auth')
      .then(({ data }) => {
        console.log('Auth: ', data);
        try {
          if (data) {
            //Implement Redux in future to make this cleaner
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
      })
    }
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
