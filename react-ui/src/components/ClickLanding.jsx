import React, { Component } from 'react';
import axios from 'axios';
import { Container, Image, Transition } from 'semantic-ui-react';

export default class ClickLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      currentIndex: 0,
      animation: 'pulse',
      duration: 250,
      visible: true
    };
    this.getSplashImages = this.getSplashImages.bind(this);
    this.alterPhoto = this.alterPhoto.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.getSplashImages();
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  getSplashImages = () => {
    axios
      .get('/landing')
      .then(({ data }) => {
        const temp = [];
        data.results.forEach(img => {
          temp.push(img.urls.regular);
        });
        this.setState((prevState, props) => ({
          imgs: temp,
          currentIndex: 0
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  alterPhoto() {
    if (this.state.currentIndex !== 29) {
      this.setState((prevState, props) => ({
        currentIndex: (prevState.currentIndex += 1)
      }));
      this.toggleVisibility();
    } else {
      this.setState((prevState, props) => ({
        currentIndex: 0
      }));
      this.toggleVisibility();
    }
  }

  render() {
    const { animation, currentIndex, duration, imgs, visible } = this.state;
    return (
      <Container id="splashWrap">
        <Transition animation={animation} duration={duration} visible={visible}>
          <div className="card" content="Run" onClick={this.toggleVisibility}>
            <Image id="splashImage" onClick={this.alterPhoto} src={imgs[currentIndex]} rounded />
          </div>
        </Transition>
      </Container>
    );
  }
}
