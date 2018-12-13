import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Sidebar, Visibility } from 'semantic-ui-react';
import PhotoSwiper from './PhotoSwiper';
import OnBoard from './OnBoard';
import Recommendations from './Recommendations';
import LikedImages from './LikedImages';
import EditProfile from './EditProfile';
import Reviews from './Reviews';
import Suggestions from './Suggestions';
import SidebarMain from './SidebarMain';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: '',
      likedImageHP: 0,
      visible: this.props.sidebar,
      calculations: {
        width: 0
      }
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

  componentDidUpdate(prevProps) {
    const { userPhotoImpressions } = this.props;
    if (userPhotoImpressions.length !== prevProps.userPhotoImpressions.length) {
      if (userPhotoImpressions.length >= 30) {
        // console.log('recmnt1');
        this.changeViews('recommendations');
      } else if (userPhotoImpressions.length < 30 && userPhotoImpressions.length > 0) {
        // console.log('plmnt1');
        this.changeViews('photoSwiper');
      } else {
        // console.log('missed photo impression checks, going to onBoard1');
        this.changeViews('onBoard');
      }
    }
  }

  getUserInformation = userId => {
    axios
      .get(`/users/${userId}/likedphotos`)
      .then(({ data }) => {
        // console.log(`response from getting user id=${userId} liked photos ==>`, data);
        this.props.changeState('userPhotoImpressions', data);
        this.setState(() => ({ likedImageHP: data.length }));
      })
      .catch(error => {
        console.log('Could not fetch user information!');
        console.log(error);
      });
  };

  getViews() {
    const { likedImageHP, views } = this.state;
    const { changeState, reloadUser, userInformation, userPhotoImpressions } = this.props;
    if (views === 'onBoard') {
      return <OnBoard changeViews={this.changeViews} changeStates={this.changeStates} />;
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

  handleUpdate = (e, { calculations }) => this.setState({ calculations });

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
    // this.setState(prevState => ({
    //   likedImageHP: (prevState.likedImageHP += 1)
    // }));
    this.setState(prevState => ({ likedImageHP: prevState.likedImageHP + 1 }));
  }

  render() {
    // const { calculations } = this.state
    // <div>{calculations.width.toFixed()}px Via Visibilty sematic UI</div>
    // <div>height = {window.innerHeight}, width = {window.innerWidth} via window</div>
    const { sidebar, userInformation } = this.props;
    const { likedImageHP } = this.state;
    return (
      <Sidebar.Pushable as={Segment}>
        <SidebarMain
          visible={sidebar}
          userInformation={userInformation}
          likeProgress={likedImageHP}
          changeViews={this.changeViews}
          changeStates={this.changeStates}
        />

        <Sidebar.Pusher>
          <Visibility onUpdate={this.handleUpdate}>{this.getViews()}</Visibility>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
