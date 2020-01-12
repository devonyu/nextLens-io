import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import styled from 'styled-components';

const masonryOptions = {
  transitionDuration: '2s',
  itemSelector: '.grid-item',
  columnWidth: 20,
  gutter: 10,
  horizontalOrder: true,
  fitWidth: true
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

const LikedImagesContainer = styled.div`
  height: calc(100vh - 75px);
  position: relative;
`;

const MasonaryContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  padding: 1em;
  overflow: auto;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 2em;
`;

export default class LikedImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      error: null
    };
  }

  componentDidMount() {
    const { userInfo } = this.props;
    axios
      .get(`/users/${userInfo.id}/likedphotos`)
      .then(({ data }) => {
        const temp = [];
        data.forEach(img => {
          temp.push(img);
        });
        this.setState(() => ({
          photos: temp
        }));
      })
      .catch(error => {
        console.log(error);
        this.setState(() => ({
          error: error
        }));
      });
  }

  render() {
    const { error, photos } = this.state;
    const childElements = photos.map((photo, i) => (
      <div className="grid-item" key={i}>
        <img className="grid-item-photo" src={photo.smallurl} alt={photo.photographername} />
        <p className="grid-item-photographer">
          Photographer:
          {photo.photographername}
        </p>
      </div>
    ));

    if (error) {
      return (
        <LikedImagesContainer>
          <Title>{error}</Title>
        </LikedImagesContainer>
      );
    } else if (photos.length === 0) {
      return (
        <LikedImagesContainer>
          <Title>You have 0 likes</Title>
        </LikedImagesContainer>
      );
    } else {
      return (
        <LikedImagesContainer>
          <MasonaryContainer>
            <Masonry
              className="my-gallery-class" // default ''
              elementType="div" // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              {childElements}
            </Masonry>
          </MasonaryContainer>
        </LikedImagesContainer>
      );
    }
  }
}

LikedImages.propTypes = {
  userInfo: PropTypes.shape({
    about: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    mount: PropTypes.number,
    profileimgurl: PropTypes.string
  }).isRequired
};
