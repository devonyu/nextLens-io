import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Transition } from 'semantic-ui-react'
import Profile from './Profile';
//import SidebarExampleSidebar from './SideBar';

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
		const { animation, duration, visible } = this.state
		return(
			<Container fluid>

				<Container fluid textAlign='center'>
					<h2>Hello {this.props.userInformation.firstname}!</h2>
					<h2>You have liked {this.props.userPhotoImpressions.length} photos!</h2>
					<h3>The recommendation system will need at least 30 likes before we can calculate accurate results..</h3>
					<h3>{30 - this.props.userPhotoImpressions.length} more likes to go!</h3>
					<Button basic color='blue' size='large' content='Photoliker Beta' onClick={this.toggleChangeView}/>
				</Container>

				<Container fluid textAlign='center'>
					<Transition animation={animation} duration={duration} visible={visible}>
						<div> Make a new component here to render a list of recommended lenses
							<br/>
							if not enough data, tell user to use photoliker!
						</div>
					</Transition>
				</Container>

				<Container>
					<Profile userInformation={this.props.userInformation} />
				</Container>

				{/* <SidebarExampleSidebar>

				</SidebarExampleSidebar> */}

			</Container>
		)
	}
}