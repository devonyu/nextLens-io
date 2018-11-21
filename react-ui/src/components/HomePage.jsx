import React, { Component } from 'react';
import axios from 'axios';
//import OldPhotoliker from './OldPhotoLiker';
//import BetaPL from './BetaPL';
import PhotoSwiper from './PhotoSwiper';
import OnBoard from './OnBoard';
import Recommendations from './Recommendations';
import LikedImages from './LikedImages';
import EditProfile from './EditProfile';
import Reviews from './Reviews';
import Suggestions from './Suggestions';
import SidebarMain from './SidebarMain';

import { Segment, Sidebar, Visibility } from 'semantic-ui-react'

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
		}
	this.getUserInformation = this.getUserInformation.bind(this);
	this.changeViews = this.changeViews.bind(this);
    this.changeStates = this.changeStates.bind(this);
	this.getViews = this.getViews.bind(this);
	this.updateHP = this.updateHP.bind(this);
	}

	changeViews(option) {
		this.setState(() => {
		  return {
			  views: option
		  };
		});
	}
	
	changeStates(option, value) {
		this.setState(() => {
		  return {
			  [option]: value
		  };
		});
	}

	handleUpdate = (e, { calculations }) => this.setState({ calculations })

	getUserInformation = (userId) => {
		axios.get(`/users/${userId}/likedphotos`)
		.then(({ data }) => {
			//console.log(`response from getting user id=${userId} liked photos ==>`, data);
			this.props.changeState('userPhotoImpressions', data);
			this.setState(() => {
				return {likedImageHP: data.length}
			})
    	})
		.catch((error) => {
			console.log('Could not fetch user information!')
		  	console.log(error);
		});
	}

	updateHP() {
		this.setState((prevState) => {
			return {
				likedImageHP: prevState.likedImageHP += 1
			};
		  });
	}
	  
	getViews() {
		if (this.state.views === 'onBoard') {
			return <OnBoard
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		} else if (this.state.views ==='photoSwiper') {
			return <PhotoSwiper
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			changeTopState= { this.props.changeState }
			userInfo= { this.props.userInformation }
			likeProgress={ this.state.likedImageHP }
			updateProgress={ this.updateHP }
			/>
		} else if (this.state.views ==='recommendations') {
			return <Recommendations
			userInfo= { this.props.userInformation }
			topProgress = { this.props.userPhotoImpressions.length }
			likeProgress={ this.state.likedImageHP }
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		} else if (this.state.views ==='likedImages') {
			return <LikedImages
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			userInfo= { this.props.userInformation }
			/>
		} else if (this.state.views ==='reviews') {
			return <Reviews
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		}
		else if (this.state.views ==='editProfile') {
			return <EditProfile
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			userInformation={ this.props.userInformation }
			reloadUser= { this.props.reloadUser }
			/>
		}
		else if (this.state.views ==='suggestions') {
			return <Suggestions
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			userInformation={ this.props.userInformation }
			/>
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.userPhotoImpressions.length !== prevProps.userPhotoImpressions.length) {
			if (this.props.userPhotoImpressions.length >= 30){
				console.log('recmnt1');
				this.changeViews('recommendations');
			} else if (this.props.userPhotoImpressions.length < 30 && this.props.userPhotoImpressions.length > 0){
				console.log('plmnt1');
				this.changeViews('photoswiper');
			} else {
				//console.log('missed photo impression checks, going to onBoard1');
				this.changeViews('onBoard');
			}
		}
	}

	componentDidMount = async () => {
		//console.log('HP mounted => Getting userID => ', this.props.userInformation.id);	
		await this.getUserInformation(this.props.userInformation.id);
		//console.log('HP, Photo impressions after getinformation ', this.props.userPhotoImpressions);
		if (this.props.userPhotoImpressions.length > 0) {
			if (this.props.userPhotoImpressions.length >= 30){
				console.log('recmnt2');
				this.changeViews('recommendations');
			} else if (this.props.userPhotoImpressions.length < 30 && this.props.userPhotoImpressions.length > 0){
				console.log('plmnt2');	
				this.changeViews('photoswiper');
			} else {
				//console.log('missed photo impression checks, going to onBoard3');
				this.changeViews('onBoard');
			}
		} else {
			//console.log('missed photo impression checks, going to onBoard4');
			this.changeViews('onBoard');
		}
	}

	render() {
		//const { calculations } = this.state
		// <div>{calculations.width.toFixed()}px Via Visibilty sematic UI</div>
		// <div>height = {window.innerHeight}, width = {window.innerWidth} via window</div>
		return(
				<Sidebar.Pushable as={Segment}>
					<SidebarMain
						visible={this.props.sidebar}			
						userInformation={this.props.userInformation}
						likeProgress={this.state.likedImageHP}
						changeViews={ this.changeViews }
						changeStates={ this.changeStates }
					>
					</SidebarMain>

					<Sidebar.Pusher>
						<Visibility onUpdate={this.handleUpdate}>
							{ this.getViews() }
						</Visibility>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
		)
	}
}