import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Image, Transition } from 'semantic-ui-react';

export default class Landing extends Component {
    constructor(props) {
        super(props);
		this.state = {
			imgs: [],
            currentIndex: 0,
            animation: 'pulse', 
            duration: 250, 
            visible: true
        }
        this.getSplashImages = this.getSplashImages.bind(this);
        this.alterPhoto = this.alterPhoto.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.toggleChangeView = this.toggleChangeView.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    toggleChangeView = () => {
        this.props.changeView('photoliker');
    }

    toggleSignup = () => {
        this.props.changeView('signup');
    }

    getSplashImages = () => {
		axios.get('/landing')
		.then(({ data }) => {
            const temp = [];
            data.results.forEach((img)=> {
                //if we can determine internet speed we can optimize b/w reg/small
                temp.push(img.urls.regular)
            })
            this.setState(function(prevState, props) {
                return {
                    imgs: temp,
                    currentIndex: 0
                };
              });
		})
		.catch((error) => {
		    console.log(error);
		});
    }

    alterPhoto () {
        if (this.state.currentIndex !== 29) {
            this.setState(function(prevState, props) {
                return {
                    currentIndex: prevState.currentIndex += 1
                };
              });
              this.toggleVisibility();
        } else {
            this.getSplashImages();
        }
    }

    componentDidMount () {
        this.getSplashImages();
        setInterval(this.alterPhoto, 3500)
    }

    render() {
        const { animation, duration, visible } = this.state

        return(
            <Container fluid>
                <Container fluid textAlign='center'>
                <h2>Based off of images you like, we will give recommendations for lenses that suit your preferences!</h2>

                <Button basic color='green' size='large' content='Sign up for free' onClick={this.toggleSignup}/>
                <Button basic color='blue' size='large' content='Photoliker Beta' onClick={this.toggleChangeView}/>
                </Container>

                <Container>
                    <Transition animation={animation} duration={duration} visible={visible}>
                        <div id="splashImage" className="card" content='Run' onClick={this.toggleVisibility}>
                            <Image onClick={this.alterPhoto} 
                                src={this.state.imgs[this.state.currentIndex]}
                                rounded
                            />
                        </div>
                    </Transition>
                </Container>
            </Container>
        )
    }
}
