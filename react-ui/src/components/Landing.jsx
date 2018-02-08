import React, { Component } from 'react';
import axios from 'axios';
import { Button, Checkbox, Container, Form, Image, Segment, Popup, Transition } from 'semantic-ui-react'

export default class Landing extends Component {
    constructor(props) {
        super(props);
        
		this.state = {
			imgs: [],
            current: [],
            currentUrl: '',
            animation: 'pulse', 
            duration: 2000, 
            visible: true
        }
        
        this.getSplashImage = this.getSplashImage.bind(this);
        this.alterPhoto = this.alterPhoto.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

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
        this.getSplashImage();
        setInterval(this.alterPhoto, 10000)
    }

    render() {
        const { animation, duration, visible } = this.state
        return(
            <Container>
                <Transition animation={animation} duration={duration} visible={visible}>
                    <div className="card" content='Run' onClick={this.toggleVisibility}>
                        <Image onClick={this.alterPhoto} src={this.state.currentUrl}/>
                    </div>
                </Transition>
            </Container>
        )
    }

}
