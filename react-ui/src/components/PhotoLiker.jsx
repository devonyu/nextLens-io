import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Image, Popup, Transition } from 'semantic-ui-react'
import NavBar from './NavBar';


export default class PhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
            current: {},
            currentUrl: '',
			userid: 1,
			userAccount: ''
		}
		this.getPics = this.getPics.bind(this)
		this.handleNo = this.handleNo.bind(this)
		this.handleYes = this.handleYes.bind(this)
    }

    //Gets 30 random images with the Unsplash Api and sets it into state
	getPics = () => {
		axios.get('/pics')
		.then((data) => {
        let temp = data.data[0].exif;
        let imageUrl = data.data[0].urls.regular;
		this.setState({ 
			imgs: data.data,
            current: temp,
            currentUrl: imageUrl
		 });
		console.log('State inside Liker: ', this.state)
		})
		.catch((error) => {
		console.log(error);
		});
    }
    
    handleYes = () => {
        console.log('Yes Clicked');
        let temp = this.state.imgs
		temp.shift();
		if (temp.length === 0) {
			this.getPics()
		} else {
			this.setState({
				imgs: temp,
                current: temp[0].exif,
                currentUrl: temp[0].urls.regular
			})
		}
    }

    handleNo = () => {
        console.log('No Clicked');
		let temp = this.state.imgs
		temp.shift();
		if (temp.length === 0) {
			this.getPics()
		} else {
			this.setState({
				imgs: temp,
                current: temp[0].exif,
                currentUrl: temp[0].urls.regular
			})
		}
    }

    componentWillMount () {
        this.getPics();
    }

    render() {
        return(
            <Container fluid>
                <NavBar changeView={this.props.changeView}/>
                <Container fluid textAlign='center'>
                    <h2>PhotoLiker Beta 1.0</h2>
                    <Button onClick={this.handleYes} size='big'>Like</Button>
                    <Button onClick={this.handleNo} size='big'>Dislke</Button>
                    <br/>
                        <Popup
                            trigger={
                                <Image src={this.state.currentUrl}
                                    size='huge'
                                    rounded
                                    centered={true}
                                />
                            }
                            header={this.state.imgs.length !== 0 ? <p>Download this picture on Unsplash <a href={this.state.imgs[0].links.download_location}>here</a></p> : null}
                            content={this.state.imgs.length !== 0 ? <p>Photo by <a href={'https://unsplash.com/@' + this.state.imgs[0].user.username + '?utm_source=Photoliker&utm_medium=referral'} >{this.state.imgs[0].user.name}</a> on <a href={'https://unsplash.com/?utm_source=Photoliker&utm_medium=referral'}>Unsplash </a> </p>: null }
                            on={['click']}
                        />
                </Container>
            </Container>
        )
    }

}

