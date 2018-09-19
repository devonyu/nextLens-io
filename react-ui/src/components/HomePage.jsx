import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'
import SidebarMain from './SideBar';
import Photoliker from './PhotoLiker';
import OnBoard from './OnBoard';
import Recommendations from './Recommendations';
import LikedImages from './LikedImages';
import EditProfile from './EditProfile';
import Reviews from './Reviews';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			views: 'onBoard',
		}
	this.getUserInformation = this.getUserInformation.bind(this);
	this.changeViews = this.changeViews.bind(this);
    this.changeStates = this.changeStates.bind(this);
    this.getViews = this.getViews.bind(this);
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	changeViews(option) {
		this.setState((prevState, props) => {
		  return {
			  views: option
		  };
		});
	  }
	
	  changeStates(option, value) {
		this.setState((prevState, props) => {
		  return {
			  [option]: value
		  };
		});
	  }

	getUserInformation = (userId) => {
		//console.log('send axios req to server w/id:', userId, ' to retrieve liked photos');
		axios.get(`/users/${userId}/likedphotos`)
		.then(({ data }) => {
			console.log(`response from getting user id=${userId} liked photos ==>`, data);
			this.props.changeState('userPhotoImpressions', data);
    	})
		.catch((error) => {
		  console.log(error);
		});
	}
	  
	getViews() {
		if (this.state.views === 'onBoard') {
			return <OnBoard
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		} else if (this.state.views ==='photoliker') {
			return <Photoliker
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		} else if (this.state.views ==='recommendations') {
			return <Recommendations
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			/>
		} else if (this.state.views ==='likedImages') {
			return <LikedImages
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
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
			/>
		}
	}

	componentDidMount () {
		this.getUserInformation(this.props.userInformation.id);
	}

	render() {
		console.log('current state: ', this.state);
		return(
			<div>
				<Grid>
					<Grid.Column mobile={4} tablet={3} computer={2}>
						<SidebarMain 
							id='sidebar' 
							userInformation={this.props.userInformation}
							likeProgress={this.props.userPhotoImpressions.length}
							changeViews={ this.changeViews }
							changeStates={ this.changeStates }
						>
						</SidebarMain>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={12} computer={14}>
						<div>{ this.getViews() }</div>
					</Grid.Column>
				</Grid>	
			</div>
		)
	}
}