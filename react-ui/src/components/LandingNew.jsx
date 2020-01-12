import React from 'react';
// import { Button, Container } from 'semantic-ui-react';
import './LandingNew.scss';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeLanding from './SwipeLanding';

const Main = () => {
  return (
    <div className="ltr">
      <section className="primary">
        <h1>Find your Next Lens</h1>
        <p>Discover new lens options based on your personal tastes</p>
        <a href="#">Sign up/ Login</a>
      </section>
      <section className="primaryImage">
        <div className="imageContainer">
          <img className="ipad" src="http://tinyimg.io/i/B3TTr4q.gif" />
        </div>
      </section>
    </div>
  );
};

const FeatureOne = () => {
  return (
    <div className="rtl">
      <section className="primary">
        <h1 className="featureTitle">Content-based recommendation system</h1>
        <p>
          App calculates the top lens recommmendations for users based on a multitude of data points
        </p>
        <p>
          We could totally use AI or ML to create this recommendation system or a mathematical
          algorithm
        </p>
        <p>Multi-Arm Bandit Algorithm to dynamically display images based on most recent likes</p>
      </section>
      <section className="primaryImage">
        <div className="imageContainer">
          <img
            className="ipad scaledown"
            src="https://media3.giphy.com/media/6P9Tr4yVla6Hu/giphy.gif?cid=790b76118b46d119b6e74ef34771f45381f91f7e390af239&rid=giphy.gif"
          />
        </div>
      </section>
    </div>
  );
};

const FeatureTwo = () => {
  return (
    <div className="ltr">
      <section className="primary">
        <h1 className="featureTitle">Curated lens recommendations</h1>
        <p>
          Discover a wide array of lenses. From legendary classics, newly updated must-haves, to
          hidden gems, your perfect lens is just a couple of swipes away
        </p>
        <p>Current Lens Mounts: Nikon, Canon, Sony, FujiFilm</p>
      </section>
      <section className="primaryImage">
        <div className="imageContainer">
          <img className="ipad" src="http://tinyimg.io/i/vbbSSXY.gif" />
        </div>
      </section>
    </div>
  );
};

const FeatureThree = () => {
  return (
    <div className="rtl">
      <section className="primary">
        <h1 className="featureTitle">View Real Images</h1>
        <p>
          Utilizing the FlickR API, NextLens allows users to search images taken with specific
          lenses.
        </p>
        <p>Now you can see exactly the types of photos you can capture yourself!</p>
      </section>
      <section className="primaryImage">
        <div className="imageContainer">
          <img className="iphone" src="http://tinyimg.io/i/U24dC1R.gif" />
        </div>
      </section>
    </div>
  );
};

const FeatureFour = () => {
  return (
    <div className="ltr">
      <section className="primary">
        <h1 className="featureTitle">Future Features</h1>
        <p>Abilty to let users share their own images and incorporate them into the photo pool</p>
        <p>Share in depth reviews of lenses along with tips/tricks</p>
        <p>Create a community for photographers to discuss lenses via a forum</p>
      </section>
      <section className="primaryImage">
        <div className="imageContainer">
          <img id="future" src="http://tinyimg.io/i/Z9gLzhY.png" />
        </div>
      </section>
    </div>
  );
};

const LandingNew = () => {
  return (
    <div className="AppContainer">
      <main>
        <Main />
        <FeatureOne />
        <FeatureTwo />
        <FeatureThree />
        <FeatureFour />
      </main>
    </div>
  );
};

export default LandingNew;

LandingNew.propTypes = {
  changeView: PropTypes.func.isRequired
};
