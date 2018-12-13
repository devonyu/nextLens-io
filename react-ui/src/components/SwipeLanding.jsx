import React, { Component } from 'react';
import axios from 'axios';
import { Container, Image } from 'semantic-ui-react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class SwipeLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: []
    };
    this.getSplashImages = this.getSplashImages.bind(this);
  }

  componentWillMount() {
    this.getSplashImages();
  }

  getSplashImages() {
    axios
      .get('/landing')
      .then(({ data }) => {
        let temp = [];
        data.results.forEach(img => {
          temp.push(img.urls.regular);
        });
        // lower the bandwith by changing amount of images to load
        temp = temp.slice(0, 5);
        this.setState(() => ({
          imgs: temp
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { imgs } = this.state;
    return (
      <Container id="splashWrap">
        <AutoPlaySwipeableViews
          enableMouseEvents
          animateTransitions
          resistance
          autoplay
          interval={6000}
        >
          {imgs.map((image, i) => (
            <Image key={i} id="splashImage" src={image} />
          ))}
        </AutoPlaySwipeableViews>
      </Container>
    );
  }
}
