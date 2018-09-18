import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'
import SidebarMain from './SideBar';
import Photoliker from './PhotoLiker';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animation: 'pulse', 
			duration: 250, 
			visible: true,
		}
	this.getUserInformation = this.getUserInformation.bind(this);
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	toggleChangeView = () => {
		this.props.changeView('photoliker');
	}

	getUserInformation = (userId) => {
		console.log('send axios req to server w/id:', userId, ' to retrieve liked photos');
		axios.get(`/users/${userId}/likedphotos`)
		.then(({ data }) => {
			console.log(`response from getting user id=${userId} liked photos ==>`, data);
			// Change State at Top level.... perhaps redux/context api will be good for statemanagement!!!
			this.props.changeState('userPhotoImpressions', data);
			// We can divide userImpressions to an object with like and dislike keys
    	})
		.catch((error) => {
		  console.log(error);
		});
  }

	componentDidMount () {
		this.getUserInformation(this.props.userInformation.id);
	}

	render() {
		return(
			<div>
				    <Grid>
						<Grid.Column mobile={16} tablet={8} computer={3}>
							<SidebarMain 
								id='sidebar' 
								userInformation={this.props.userInformation}
								likeProgress={this.props.userPhotoImpressions.length}
							>
							</SidebarMain>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={8} computer={12}>
							<Photoliker id='photoliker'>
								changeView={ this.changeView }
								changeState={this.changeState}
								userInformation={ this.state.userState }
								userPhotoImpressions={ this.state.userPhotoImpressions }
							</Photoliker>
						</Grid.Column>
					</Grid>	
				</div>
		)
	}
}