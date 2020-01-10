import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhotoSwiper from './PhotoSwiper';
import OnBoard from './OnBoard';
import Recommendations from './Recommendations';
import LikedImages from './LikedImages';
import EditProfile from './EditProfile';
import Reviews from './Reviews';
import Suggestions from './Suggestions';
import SidebarMain from './SidebarMain';

const FullHeightContainer = styled.div`
  height: calc(100vh - 68px);
`;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: '',
      likedImageHP: 0
    };
    this.getUserInformation = this.getUserInformation.bind(this);
    this.changeViews = this.changeViews.bind(this);
    this.changeStates = this.changeStates.bind(this);
    this.getViews = this.getViews.bind(this);
    this.updateHP = this.updateHP.bind(this);
  }

  componentDidMount = async () => {
    const { userInformation, userPhotoImpressions } = this.props;
    await this.getUserInformation(userInformation.id);
    // console.log('HP, Photo impressions after getinformation ', this.props.userPhotoImpressions);
    if (userPhotoImpressions.length > 0) {
      if (userPhotoImpressions.length >= 30) {
        // console.log('recmnt2');
        this.changeViews('recommendations');
      } else if (userPhotoImpressions.length < 30 && userPhotoImpressions.length > 0) {
        // console.log('plmnt2');
        this.changeViews('photoSwiper');
      } else {
        // console.log('missed photo impression checks, going to onBoard3');
        this.changeViews('onBoard');
      }
    } else {
      // console.log('missed photo impression checks, going to onBoard4');
      this.changeViews('onBoard');
    }
  };

  getUserInformation = userId => {
    const { changeState } = this.props;
    axios
      .get(`/users/${userId}/likedphotos`)
      .then(({ data }) => {
        changeState('userPhotoImpressions', data);
        this.setState(() => ({ likedImageHP: data.length }));
      })
      .catch(error => {
        console.log('Could not fetch user information! Error: ', error);
      });
  };

  getViews() {
    const { likedImageHP, views } = this.state;
    const { changeState, reloadUser, userInformation, userPhotoImpressions } = this.props;
    console.log('%c homepage getview call ', 'color: #bada55');
    if (views === 'onBoard') {
      return (
        <OnBoard
          changeViews={this.changeViews}
          changeStates={this.changeStates}
          status={userPhotoImpressions.length}
        />
      );
    }
    if (views === 'photoSwiper') {
      return (
        <PhotoSwiper
          changeViews={this.changeViews}
          changeStates={this.changeStates}
          changeTopState={changeState}
          userInfo={userInformation}
          likeProgress={likedImageHP}
          updateProgress={this.updateHP}
        />
      );
    }
    if (views === 'recommendations') {
      return (
        <Recommendations
          userInfo={userInformation}
          topProgress={userPhotoImpressions.length}
          likeProgress={likedImageHP}
          changeViews={this.changeViews}
          changeStates={this.changeStates}
        />
      );
    }
    if (views === 'likedImages') {
      return (
        <LikedImages
          changeViews={this.changeViews}
          changeStates={this.changeStates}
          userInfo={userInformation}
        />
      );
    }
    if (views === 'reviews') {
      return <Reviews changeViews={this.changeViews} changeStates={this.changeStates} />;
    }
    if (views === 'editProfile') {
      return (
        <EditProfile
          changeViews={this.changeViews}
          changeStates={this.changeStates}
          userInformation={userInformation}
          reloadUser={reloadUser}
        />
      );
    }
    if (views === 'suggestions') {
      return (
        <Suggestions
          changeViews={this.changeViews}
          changeStates={this.changeStates}
          userInformation={userInformation}
        />
      );
    }
    return null;
  }

  changeStates(option, value) {
    this.setState(() => ({
      [option]: value
    }));
  }

  changeViews(option) {
    this.setState(() => ({
      views: option
    }));
  }

  updateHP() {
    this.setState(prevState => ({ likedImageHP: prevState.likedImageHP + 1 }));
  }

  render() {
    const { sidebar, userInformation } = this.props;
    const { likedImageHP } = this.state;
    console.log('rendering homepage again!');
    return (
      <FullHeightContainer>
        <Sidebar.Pushable as={Segment}>
          <SidebarMain
            visible={sidebar}
            userInformation={userInformation}
            likeProgress={likedImageHP}
            changeViews={this.changeViews}
            changeStates={this.changeStates}
          />
          <Sidebar.Pusher>{this.getViews()}</Sidebar.Pusher>
        </Sidebar.Pushable>
      </FullHeightContainer>
    );
  }
}

HomePage.propTypes = {
  userInformation: PropTypes.shape({
    about: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    mount: PropTypes.number,
    profileimgurl: PropTypes.string
  }).isRequired,
  reloadUser: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
  userPhotoImpressions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sidebar: PropTypes.bool.isRequired
};
