import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import PhotoLiker from './components/PhotoLiker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <p>Find out the lenses you like based off the photos taken by them!</p>
          
          <p className="App-intro">
            {this.state.fetching
              ? 'Fetching message from API'
              : this.state.message}
          </p>
        </Container>
        <PhotoLiker/>
      </div>
    );
  }
}

export default App;
