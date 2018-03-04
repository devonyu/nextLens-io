import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Image, Transition } from 'semantic-ui-react'
import NavBar from './NavBar';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
		this.state = {
            signedin: false,
			imgs: [],
            current: [],
            currentUrl: '',
            animation: 'pulse', 
            duration: 250, 
            visible: true
        }
        
        this.getSplashImage = this.getSplashImage.bind(this);
        this.alterPhoto = this.alterPhoto.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.toggleChangeView = this.toggleChangeView.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    toggleChangeView = () => {
        console.log('clicked')
        this.props.changeView('photoliker');
    }

    toggleSignup = () => {
        console.log('clicked')
        this.props.changeView('signup');
    }
	getSplashImage = () => {
		axios.get('/landing')
		.then(({ data }) => {
        let temp = [];
        data.forEach((img)=> {
            temp.push(img.urls.regular)
        })
		this.setState({ 
			imgs: temp,
            current: temp[0],
            currentUrl: temp[0]
		 });
		})
		.catch((error) => {
		console.log(error);
		});
    }

    newGetSplashImages = () => {
		axios.get('/newlanding')
		.then(({ data }) => {
        let temp = [];
        data.results.forEach((img)=> {
            temp.push(img.urls.regular)
        })
		this.setState({ 
			imgs: temp,
            current: temp[0],
            currentUrl: temp[0]
		 });
		})
		.catch((error) => {
		console.log(error);
		});
    }

    alterPhoto () {
        let hold = this.state.imgs[0];
        let tempz = this.state.imgs.slice(1)
        tempz.push(hold);
        this.setState({
            imgs: tempz,
            current: tempz[0],
            currentUrl: tempz[0]
        })
    }

    componentDidMount () {
        this.newGetSplashImages();
        //setInterval(this.alterPhoto, 5000)
    }

    render() {
        const { animation, duration, visible } = this.state

        return(
            <Container fluid>
                <NavBar changeView={this.props.changeView}/>
                <Container fluid textAlign='center'>
                <h1>User HOMEPAGE</h1>
                <h2>DO WE HAVE ENOUGH DATA ON YOU?</h2>
            
                <Button basic color='green' size='large' content='Sign up for free' onClick={this.toggleSignup}/>
                <Button basic color='blue' size='large' content='Photoliker Beta' onClick={this.toggleChangeView}/>
                </Container>

                <Container>
                    <Transition animation={animation} duration={duration} visible={visible}>
                        <div className="card" content='Run' onClick={this.toggleVisibility}>
                            <Image onClick={this.alterPhoto} 
                                src={this.state.currentUrl}
                                rounded
                            />
                        </div>
                    </Transition>
                </Container>
            </Container>

        )
    }

}