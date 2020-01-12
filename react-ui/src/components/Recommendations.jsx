import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import photoswipergif from '../images/photoswiperipad.gif';
import Reco from './Reco';
import FullPageSpinner from './FullPageSpinner';

const RecommendationsContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  background-color: #1b1c1d;
  display: flex;
  justify-content: center;
  position: relative;
`;

const NotReadyContainer = styled.div`
  height: 100%;
  min-width: 70vw;
  max-width: 70vw;
  background-color: transparent;
  color: white;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
`;

const IpadPhotoswiper = styled.img`
  position: relative;
  width: auto;
  max-height: 80vh;
  min-height: 50vh;
  margin: auto;
  margin-top: 3em;
  border-radius: 1em;
  background-color: transparent;
  cursor: pointer;
`;

const ReadyContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  background-color: grey;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 45px;
  color: white;
`;

export default class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lensRecommendations: [],
      price: 'low',
      error: null
    };
  }

  componentDidMount() {
    // console.log('recommendations mounted');
    if (this.props.likeProgress < 30 && this.props.topProgress < 30) {
      console.log('NOT ENOUGH DATA');
      setTimeout(() => {
        this.setState(() => ({
          loading: false
        }));
      }, 1000);
    } else {
      console.log('loading recs!!!');
      this.loadRecommendations();
    }
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.setState(() => ({
      lensRecommendations: []
    }));
  }

  loadRecommendations() {
    axios
      .get(`/users/${this.props.userInfo.id}/${this.props.userInfo.mount}/recommendations`)
      .then(({ data }) => {
        console.log('FE Data Loaded: ', data);
        this.setState(() => ({
          loading: false,
          lensRecommendations: data
        }));
      })
      .catch(err => {
        console.log('error with AXIOS, ', err);
        this.setState(() => ({
          loading: false,
          error: err
        }));
      });
  }

  render() {
    const { error, lensRecommendations, loading, price } = this.state;
    const { changeViews, userInfo } = this.props;
    if (loading) {
      return <FullPageSpinner />;
    }
    return (
      <RecommendationsContainer>
        {lensRecommendations && lensRecommendations.length === 0 ? (
          <NotReadyContainer>
            <div>
              <h1>Recommendations not ready</h1>
              <p>Please continue using Photoswiper and like images!</p>
            </div>
            <div>
              <IpadPhotoswiper
                src={photoswipergif}
                alt="photoswiper"
                onClick={() => changeViews('photoSwiper')}
              />
            </div>
          </NotReadyContainer>
        ) : (
          <ReadyContainer>
            <Title>
              Lens Recommendations for
              {` ${userInfo.firstname}`}
            </Title>
            {!error ? <Reco lenses={lensRecommendations} price={price} /> : <>{error}</>}
          </ReadyContainer>
        )}
      </RecommendationsContainer>
    );
  }
}
