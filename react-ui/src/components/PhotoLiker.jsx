import React, { Component } from 'react';
//import axios from 'axios';
import { Button, Container, Image, Popup, Progress } from 'semantic-ui-react';
const api = require('../../../example_Data/api');

export default class PhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
            current: {},
            currentUrl: '',
            currentIndex: 0,
            userid: 0,
            progress: [],
			userAccount: ''
		}
		this.getPics = this.getPics.bind(this)
		this.handleNo = this.handleNo.bind(this)
		this.handleYes = this.handleYes.bind(this)
    }

    //Gets 30 random images with the Unsplash Api and sets it into state
	getPics = () => {
        this.setState({ 
			imgs: api.portrait1.concat(api.portrait2).concat(api.portrait3).concat(api.portrait4),
            currentUrl: api.portrait1[0].urls.regular,
            current: api.portrait1[0]
		 });
    }
    
    handleYes = () => {
        // let temp = this.state.imgs;
		// temp.shift();
		// if (temp.length === 0) {
		// 	this.getPics()
		// } else {
		// 	this.setState({
		// 		imgs: temp,
        //         current: temp[0].exif,
        //         currentUrl: temp[0].urls.regular
		// 	})
        // }
         let temp = this.state.current;

         this.setState(function(prevState, props) {
            return {
              //currentIndex: prevState.currentIndex ++,
              progress: prevState.progress.push(temp),
              current: prevState.imgs[prevState.currentIndex],
              currentUrl: prevState.imgs[prevState.currentIndex + 1].urls.regular
            };
          });

         this.setState(function(prevState, props) {
            return {
                currentIndex: prevState.currentIndex += 1,
            };
          });
    }

    handleNo = () => {
		let temp = this.state.imgs;
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
        console.log(this.state)
        return(
            <Container fluid>
                <Container fluid textAlign='center'>
                    <h2>PhotoLiker Beta 1.0</h2>
                    <Button onClick={this.handleYes} size='big'>Like</Button>
                    <Button onClick={this.handleNo} size='big'>Dislike</Button>
                    <Progress percent={this.state.progress.length} progress />
                    <br/>
                        <Popup
                            trigger={
                                <Image src={this.state.currentUrl}
                                    size='huge'
                                    rounded
                                    centered={true}
                                />
                            }
                            header={this.state.imgs.length !== 0 ? <p>Download this picture on Unsplash <a href={this.state.imgs[this.state.currentIndex].links.download}>here</a></p> : null}
                            content={this.state.imgs.length !== 0 ? <p>Photo by <a href={'https://unsplash.com/@' + this.state.imgs[this.state.currentIndex].user.username + '?utm_source=Photoliker&utm_medium=referral'} >{this.state.imgs[0].user.name}</a> on <a href={'https://unsplash.com/?utm_source=Photoliker&utm_medium=referral'}>Unsplash </a> </p>: null }
                            on={['click']}
                        />
                </Container>
            </Container>
        )
    }

}

