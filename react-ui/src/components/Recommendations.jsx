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
  width: 500px;
  min-width: 350px;
  background-color: white;
  border-radius: 0.3em;
  box-shadow: 13px 21px 53px -13px rgba(1, 1, 1, 0.65);
  padding: 1em;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const IpadPhotoswiper = styled.img`
  object-fit: cover;
  width: 100%;
  height: 10px;
  border-radius: 2.3em;
  background-color: transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.62);
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.7));
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
      price: 'low'
    };
  }

  componentDidMount() {
    // console.log('recommendations mounted');
    if (this.props.likeProgress < 30 && this.props.topProgress < 30) {
      console.log('NOT ENOUGH DATA');
      // setTimeout(() => {
      //   this.setState(() => ({
      //     loading: false
      //   }));
      // }, 1000);
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
        // setTimeout(() => {
        //   this.setState(() => ({
        //     // loading: false,
        //     lensRecommendations: data
        //   }));
        // }, 1000);
        this.setState(() => ({
          loading: false,
          lensRecommendations: data
        }));
      })
      .catch(err => {
        console.log('error with AXIOS, ', err);
        // this.setState(() => ({
        //   loading: false
        // }));
      });
  }

  render() {
    const { lensRecommendations, loading, price } = this.state;
    const { changeViews, userInfo } = this.props;
    if (loading) {
      return <FullPageSpinner />;
    }
    return (
      <RecommendationsContainer>
        {lensRecommendations && lensRecommendations.length === 0 ? (
          <NotReadyContainer>
            <h2>Recommendations not ready. Please continue using Photoswiper and like images!</h2>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </NotReadyContainer>
        ) : (
          <ReadyContainer>
            <Title>
              Lens Recommendations for
              {` ${userInfo.firstname}`}
            </Title>
            <Reco lenses={lensRecommendations} price={price} />
          </ReadyContainer>
        )}
      </RecommendationsContainer>
    );
  }
}
