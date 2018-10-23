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
			likedImageHP: 0
		}
	this.getUserInformation = this.getUserInformation.bind(this);
	this.changeViews = this.changeViews.bind(this);
    this.changeStates = this.changeStates.bind(this);
	this.getViews = this.getViews.bind(this);
	this.updateHP = this.updateHP.bind(this);
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

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

	getUserInformation = (userId) => {
		//console.log('send axios req to server w/id:', userId, ' to retrieve liked photos');
		console.log('Getting user info with AXIOS')
		axios.get(`/users/${userId}/likedphotos`)
		.then(({ data }) => {
			console.log(`response from getting user id=${userId} liked photos ==>`, data);
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
		} else if (this.state.views ==='photoliker') {
			return <Photoliker
			changeViews={ this.changeViews }
			changeStates={ this.changeStates }
			changeTopState= { this.props.changeState }
			userInfo= { this.props.userInformation }
			likeProgress={ this.state.likedImageHP }
			updateProgress={ this.updateHP }
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
			/>
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.userPhotoImpressions.length !== prevProps.userPhotoImpressions.length) {
			if (this.props.userPhotoImpressions.length >= 30){
				this.changeViews('recommendations')
			} else if (this.props.userPhotoImpressions.length < 30 && this.props.userPhotoImpressions.length > 0){
				this.changeViews('photoliker')
			} else {
				this.changeViews('onBoard')
			}
		}
	}

	componentDidMount () {
		this.getUserInformation(this.props.userInformation.id);
	}

	render() {
		console.log('HP STATE', this.state.likedImageHP);
		return(
			<div>
				<Grid celled columns={2}>
					<Grid.Column mobile={5} tablet={4} computer={3}>
						<div>
							<SidebarMain 
								id='sidebar' 
								userInformation={this.props.userInformation}
								likeProgress={this.state.likedImageHP}
								changeViews={ this.changeViews }
								changeStates={ this.changeStates }
							>
							</SidebarMain>
						</div>
					</Grid.Column>
					<Grid.Column mobile={8} tablet={10} computer={12}>
						<div>{ this.getViews() }</div>
					</Grid.Column>
				</Grid>	
			</div>
		)
	}
}