import React, { Component } from 'react';
//import axios from 'axios';
import { Button, Container, Image, Popup, Progress } from 'semantic-ui-react';
const api = require('../../../example_Data/api');

export default class PhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
            currentIndex: 0,
            userid: 0,
            progress: []
		}
		this.getPics = this.getPics.bind(this)
		this.handleNo = this.handleNo.bind(this)
		this.handleYes = this.handleYes.bind(this)
    }


	getPics = () => {
        //Use Portait API Dummy data for now to test
        this.setState({ 
			imgs: api.portrait1.concat(api.portrait2).concat(api.portrait3).concat(api.portrait4)
		 });
    }
    
    handleYes = () => {
        //add photo to user likes table
         this.setState(function(prevState, props) {
            return {
                progress: prevState.progress.concat(prevState.imgs[prevState.currentIndex]),
                currentIndex: prevState.currentIndex += 1
            };
          });
    }

    handleNo = () => {
        //add image to user likes table (dislike)
        this.setState(function(prevState, props) {
            return {
                progress: prevState.progress.concat(prevState.imgs[prevState.currentIndex]),
                currentIndex: prevState.currentIndex += 1
            };
          });
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
                    <Progress percent={Math.round(((this.state.progress.length / 30) * 10))} progress />
                    <br/>
                        <Popup
                            trigger={
                                <Image src={this.state.imgs[this.state.currentIndex].urls.small}
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

