import React, { Component } from 'react';
import { Button, Container, Image, Popup, Progress } from 'semantic-ui-react';
import { evenlyDistributedImages } from './utils.js';
import axios from 'axios';
const api = require('../example_data_react/api');

export default class PhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
            currentIndex: 1,
            currentImage: {},
            progress: []
		}
        this.getPics = this.getPics.bind(this)
        this.handleOption = this.handleOption.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

	getPics = () => {
        //Use API Dummy data for now to test
        let allCategories = []
        for (let category in api) {
            allCategories.push(api[category])
        }
        let shuffled = evenlyDistributedImages(allCategories);
        this.setState({ 
            imgs: shuffled,
            currentImage: shuffled[this.state.currentIndex]
         });
         setTimeout(()=>{console.log('state inside PL: ', this.state)}, 1000)
    }

    handleOption = async (option) => {
        //console.log('current image=> ', this.state.currentImage);
        let affinity = option === 'yes' ? true : false;
        await axios({
            method: 'post',
            url: `/users/${this.props.userInfo.id}/${this.state.currentIndex}`,
            data: {"liked":affinity}
          })
		.then(({ data }) => {
            console.log(`Adding user id=${this.props.userInfo.id} photoid=${this.state.currentIndex} data=${data}`);
    	})
		.catch((error) => {
		  console.log(error);
        });
        
        await this.setState(function(prevState, props) {
            return {
                // progress: prevState.progress.concat(prevState.imgs[prevState.currentIndex]),
                currentIndex: prevState.currentIndex += 1,
                currentImage: prevState.imgs[prevState.currentIndex]
            };
          });
          //console.log(this.state)
          //this.props.changeTopState('place', this.state.currentIndex);
          //await this.props.changeTopState('place', this.state.currentIndex);
    }

    handleKeyDown(e) {
        if (e.keyCode === 37) {
            //liked, left key pressed
            console.log('left Arrow clicked');
            this.handleOption('yes');
        } else if (e.keyCode === 39) {
            //disliked, right key pressed
            console.log('right Arrow clicked');
            this.handleOption('no');
        }
      }

    componentWillMount () {
        //get past liked images so we dont show again
        this.getPics();
    }

    componentWillReceiveProps() {
        console.log('receiving props in PL!');
    }

    render() {
        return(
                <Container fluid textAlign='center' onKeyDown={ this.handleKeyDown }>
                    <Button onClick={()=>{this.handleOption('yes')}} size='small'>Like</Button>
                    <Button onClick={()=>{this.handleOption('no')}} size='small'>Dislike</Button>
                    <Progress percent={Math.round(((this.state.progress.length / 30) * 100))} progress />
                        <Popup
                            trigger={
                                <Image src={this.state.imgs[this.state.currentIndex].urls.regular}
                                    size='huge'
                                    rounded
                                    centered={true}
                                />
                            }
                            header={this.state.imgs.length !== 0 ? <p>Download this picture on Unsplash <a href={this.state.imgs[this.state.currentIndex].links.download}>here</a></p> : null}
                            content={this.state.imgs.length !== 0 ? <p>Photo by <a href={'https://unsplash.com/@' + this.state.imgs[this.state.currentIndex].user.username + '?utm_source=Photoliker&utm_medium=referral'} >{this.state.imgs[this.state.currentIndex].user.name}</a> on <a href={'https://unsplash.com/?utm_source=Photoliker&utm_medium=referral'}>Unsplash </a> </p>: null }
                            on={['click']}
                        />
                </Container>
        )
    }

}

