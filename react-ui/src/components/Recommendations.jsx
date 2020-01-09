import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import photoswipergif from '../images/photoswiperipad.gif';
import Reco from './Reco';

const RecommendationsContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
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
  height: auto;
  border-radius: 2.3em;
  background-color: transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.62);
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.7));
  cursor: pointer;
`;

const ReadyContainer = styled.div`
  height: 100vh;
  width: 100vw;
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
      lensRecommendations: [],
      price: 'low'
    };
    // this.loadRecommendations = this.loadRecommendations.bind(this);
  }

  componentDidMount() {
    // console.log('recommendations mounted');
    if (this.props.likeProgress < 30 && this.props.topProgress < 30) {
      // console.log('NOT ENOUGH DATA');
    } else {
      // this.loadRecommendations();
      axios
        .get(`/users/${this.props.userInfo.id}/${this.props.userInfo.mount}/recommendations`)
        .then(data => {
          console.log('FE Data Loaded: ', data);
          console.log(React.version);
          const lensData = data.data;
          return lensData;
          // this.setState(() => ({
          //   lensRecommendations: lensData
          // }));
          // this.setState({ lensRecommendations: data });
        })
        .then(final => {
          console.log(final);
          this.setState(() => ({
            lensRecommendations: final
          }));
        })
        .catch(err => {
          console.log('error with AXIOS, ', err);
        });
    }
  }

  componentWillUnmount() {
    // console.log('unmounted');
    this.setState(() => ({
      lensRecommendations: []
    }));
  }

  loadRecommendations() {
    // call algo to get best lens recommendations here and get their information
    //  console.log(
    //     `Calling AXIOS WITH: ${this.props.userInfo.id}/${this.props.userInfo.mount} route!`
    //   );
    axios
      .get(`/users/${this.props.userInfo.id}/${this.props.userInfo.mount}/recommendations`)
      .then(({ data }) => {
        console.log('FE Data Loaded: ', data);
        this.setState(() => ({
          lensRecommendations: data
        }));
        // this.setState({ lensRecommendations: data });
      })
      .catch(err => {
        console.log('error with AXIOS, ', err);
      });
  }

  render() {
    const { lensRecommendations, price } = this.state;
    const { changeViews, userInfo } = this.props;
    console.log('see below');
    console.log(lensRecommendations);
    return (
      <RecommendationsContainer>
        {lensRecommendations && lensRecommendations.length === 0 ? (
          <div>
            <Title>none</Title>
          </div>
        ) : (
          <div>
            <Title>some</Title>
            <ReadyContainer>
              <Title>
                Lens Recommendations for
                {` ${userInfo.firstname}`}
              </Title>
              {lensRecommendations.length ? (
                <Reco lenses={lensRecommendations} price={price} />
              ) : null}
            </ReadyContainer>
          </div>
        )}
      </RecommendationsContainer>
    );
  }
}

{
  /* <RecommendationsContainer>
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
      </RecommendationsContainer> */
}
