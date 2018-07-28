import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Transition } from 'semantic-ui-react'

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animation: 'pulse', 
			duration: 250, 
			visible: true
	}
	this.getUserInformation = this.getUserInformation.bind(this);
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	toggleChangeView = () => {
		this.props.changeView('photoliker');
	}

	getUserInformation = (userId) => {
		axios.get('/test')
		.then(({ data }) => {
    	})
		.catch((error) => {
		  console.log(error);
		});
  }

	componentWillMount () {
		this.getUserInformation();
	}

	render() {
		const { animation, duration, visible } = this.state
		return(
			<Container fluid>
				<Container fluid textAlign='center'>
					<h2>Hello {this.props.userInformation.firstname}!</h2>
					<h3>We are looking for you recommendations now, if you have 30 likes</h3>
					<Button basic color='blue' size='large' content='Photoliker Beta' onClick={this.toggleChangeView}/>
				</Container>

				<Container>
					<Transition animation={animation} duration={duration} visible={visible}>
						<div> Make a new component here to render a list of recommended lenses
							<br/>
							if not enough data, tell user to use photoliker!
						</div>
					</Transition>
				</Container>
			</Container>
		)
	}
}