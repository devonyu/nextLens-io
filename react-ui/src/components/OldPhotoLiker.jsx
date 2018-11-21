import React, { Component } from 'react';
import { Button, Container, Image, Popup, Progress } from 'semantic-ui-react';
import { evenlyDistributedImages } from './utils.js';
import axios from 'axios';
const api = require('../example_data_react/api');

export default class OldPhotoLiker extends Component {
    constructor(props) {
		super(props);
		this.state = {
			imgs: [],
            currentIndex: 0,
            currentImage: {},
            progress: [],
            ready: 'red'
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
         //setTimeout(()=>{console.log('state inside PL: ', this.state)}, 1000)
    }

    handleOption = async (option) => {
        //console.log('current image=> ', this.state.currentImage);
        let affinity = option === 'yes' ? true : false;
        await axios({
            method: 'post',
            url: `/users/${this.props.userInfo.id}/${this.state.currentImage.nlid}`,
            data: {"liked":affinity}
          })
		.then(({ data }) => {
            console.log(`Adding user id=${this.props.userInfo.id} photoid=${this.state.currentIndex} data=${data}`);
            if (affinity === true) {
                this.props.updateProgress();
            }
    	})
		.catch((error) => {
		  console.log(error);
        });
        
        await this.setState(function(prevState) {
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
            //console.log('left Arrow clicked');
            this.handleOption('yes');
        } else if (e.keyCode === 39) {
            //console.log('right Arrow clicked');
            this.handleOption('no');
        }
      }

    componentWillMount () {
        this.getPics();
        if (this.props.likeProgress > 5 && this.props.likeProgress < 30){
            this.setState(() => {
                return {
                  ready: 'yellow'
                }
            })
        } else if (this.props.likeProgress >= 30) {
            this.setState(() => {
                return {
                  ready: 'green'
                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.likeProgress !== this.props.likeProgress) {
            if (this.props.likeProgress < 5) {
              this.setState(() => {
                return {
                  ready: 'red'
                }
              })
            } else if (this.props.likeProgress > 5 && this.props.likeProgress < 30 ) {
              this.setState(() => {
                return {
                  ready: 'yellow'
                }
              })
            } else if (this.props.likeProgress >= 30) {
              this.setState(() => {
                return {
                  ready: 'green'
                }
              })
            }
        }
    }

    render() {
        return(
                <Container fluid textAlign='center' onKeyUp={ this.handleKeyDown }>
                    <Button onClick={()=>{this.handleOption('yes')}} size='small'>Like</Button>
                    <Button onClick={()=>{this.handleOption('no')}} size='small'>Dislike</Button>
                    <Progress color={this.state.ready} percent={Math.round(((this.props.likeProgress / 30) * 100))} progress />
                        <Popup
                            trigger={
                                <Image id="splashImage" src={this.state.imgs[this.state.currentIndex].urls.regular}
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

