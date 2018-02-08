import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/NavBar';
import PhotoLiker from './components/PhotoLiker';
import Signup from './components/Signup';
import Landing from './components/Landing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'landing',
      message: null,
      fetching: true
    };
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

  render() {
    return (
      <div className="App">
        <NavBar/>

        <Container fluid>
          <h1>Tired of your current Lens?</h1>
          <h2>Find out the lenses you like based off the photos taken by them!</h2>
          
          <p className="App-intro">
            {this.state.fetching
              ? 'Fetching message from API'
              : this.state.message}
          </p>
          <Landing/>

          <Button basic color='green' size='massive' content='Sign up for free' onClick={()=>console.log('sign up clicked')}/>
        </Container>

        {/* <PhotoLiker/>
        <Signup/> */}
      </div>
    );
  }
}

export default App;
