import React, { Component } from 'react';
import axios from 'axios';
import SidebarMain from './SideBar';
import Photoliker from './PhotoLiker';
import OnBoard from './OnBoard';
import Recommendations from './Recommendations';
import LikedImages from './LikedImages';
import EditProfile from './EditProfile';
import Reviews from './Reviews';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';
import {
	Button,
	Icon,
	Menu,
	Segment,
	Sidebar,
  } from 'semantic-ui-react'

const VerticalSidebar = ({ animation, direction, visible }) => (
<Sidebar
	as={Menu}
	animation={animation}
	direction={direction}
	icon='labeled'
	inverted
	vertical
	visible={visible}
	width='thin'
>
	<Menu.Item as='a'>
	<Icon name='home' />
	Home
	</Menu.Item>
	<Menu.Item as='a'>
	<Icon name='gamepad' />
	Games
	</Menu.Item>
	<Menu.Item as='a'>
	<Icon name='camera' />
	Channels
	</Menu.Item>
</Sidebar>
)

VerticalSidebar.propTypes = {
animation: PropTypes.string,
direction: PropTypes.string,
visible: PropTypes.bool,
}


export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			views: '',
			likedImageHP: 0,
			animation: 'overlay',
			direction: 'left',
			dimmed: false,
			visible: false,
		}
	this.getUserInformation = this.getUserInformation.bind(this);
	this.changeViews = this.changeViews.bind(this);
    this.changeStates = this.changeStates.bind(this);
	this.getViews = this.getViews.bind(this);
	this.updateHP = this.updateHP.bind(this);
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	handleAnimationChange = animation => () =>
    this.setState({ animation, visible: !this.state.visible })

  	handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  	handleDirectionChange = direction => () => this.setState({ direction, visible: false })

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
				this.changeViews('photoliker');
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
				this.changeViews('photoliker');
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
		const { animation, dimmed, direction, visible } = this.state
		const vertical = direction === 'bottom' || direction === 'top'
		return(
			<div>
				<SidebarMain 
					id='sidebar' 
					userInformation={this.props.userInformation}
					likeProgress={this.state.likedImageHP}
					changeViews={ this.changeViews }
					changeStates={ this.changeStates }
				>
				</SidebarMain>
				<Button onClick={this.handleAnimationChange('push')}>Push</Button>       
				<Sidebar.Pushable as={Segment}>
					{vertical ? null : (
						<VerticalSidebar animation={animation} direction={direction} visible={visible} />
					)}

					<Sidebar.Pusher dimmed={dimmed && visible}>
						<Segment basic>
							<div>{ this.getViews() }</div> 
						</Segment>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		)
	}
}