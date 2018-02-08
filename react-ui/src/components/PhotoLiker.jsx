import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Image, Popup, Transition } from 'semantic-ui-react'

class PhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
			current: {},
			userid: 1,
			userAccount: ''
		}
		this.getPics = this.getPics.bind(this)
		this.handleNo = this.handleNo.bind(this)
		this.handleYes = this.handleYes.bind(this)
    }

	getPics = () => {
		axios.get('/pics')
		.then((data) => {
		let temp = data.data[0].exif
		this.setState({ 
			imgs: data.data,
			current: temp
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
				current: temp[0].exif
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
				current: temp[0].exif
			})
		}
    }

    componentWillMount () {
        this.getPics();
    }

    render() {
        return(
            <Container fluid>
                <Button onClick={this.handleYes}>Like</Button>
                <Button onClick={this.handleNo}>Dislke</Button>
                <br/>

                {this.state.imgs.length !== 0 ? <Image src={this.state.imgs[0].urls.regular} alt='Unsplash Photo'fluid
                size='huge'
                rounded
                centered='true'
                />  : null } 
                <br/>

                {this.state.imgs.length !== 0 ? 'Make:' + this.state.imgs[0].exif.make : null} <br/>
                {this.state.imgs.length !== 0 ? 'Model:' + this.state.imgs[0].exif.model : null} <br/>
                {this.state.imgs.length !== 0 ? 'Aperture:' + this.state.imgs[0].exif.aperture : null} <br/>
                {this.state.imgs.length !== 0 ? 'Exposure:' + this.state.imgs[0].exif.exposure_time : null} <br/>
                {this.state.imgs.length !== 0 ? 'Focal Length:' + this.state.imgs[0].exif.focal_length : null} <br/>
                {this.state.imgs.length !== 0 ? 'ISO:' + this.state.imgs[0].exif.iso : null} <br/>


                {this.state.imgs.length !== 0 ? <p>Download this picture on Unsplash <a href={this.state.imgs[0].links.download_location}>here</a></p> : null}
                {/* {this.state.imgs.length !== 0 ? <p>Photo by <a href={https://unsplash.com/@this.state.imgs[0].user.username?utm_source=your_app_name&utm_medium=referral}> {this.state.imgs[0].user.name}</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a> </p>: null} */}
                {this.state.imgs.length !== 0 ? <p>Photo by <a href={'https://unsplash.com/@' + this.state.imgs[0].user.username + '?utm_source=Photoliker&utm_medium=referral'} >{this.state.imgs[0].user.name}</a> on <a href={'https://unsplash.com/?utm_source=Photoliker&utm_medium=referral'}>Unsplash </a> </p>: null }

                    {/* <Popup
                        trigger={
                            <Image src='fsf'
                                size='huge'
                                rounded
                                centered={true}
                            />}
                        header='Photographers Name'
                        content='Descriptions and link to profile'
                        on={['click']}
                    /> */}
            </Container>
        )
    }

}

export default PhotoLiker