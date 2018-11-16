import React, { Component } from 'react';
import { evenlyDistributedImages } from './utils.js';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { Button, Container, Icon, Image, Progress, Transition } from 'semantic-ui-react';
import axios from 'axios';
const api = require('../example_data_react/api');
const EnhancedSwipeableViews = virtualize(SwipeableViews);

const styles = {
  root: {
    background: '#1b1c1d',
  },
  img: {
    width: 'auto',
    height: 'auto',
    display: 'block',
  },
};

export default class BetaPL2 extends Component {
  constructor(props) {
  super(props);
  this.state = {
          imgs: [{urls: ''},{urls: ''}],
          currentIndex: 1,
          currentImage: {},
          progress: [],
          ready: 'red',
          pressed: false,
  }
      this.getPics = this.getPics.bind(this);
      this.handleOption = this.handleOption.bind(this);
  }
  getPics = () => {
    //Use API Dummy data for now to test
    let allCategories = []
    for (let category in api) {
        allCategories.push(api[category])
    }
    let shuffled = evenlyDistributedImages(allCategories);
    //cut for the first 30 images for now
    let trimmed = shuffled;//.slice(0, 30);
    trimmed.unshift(trimmed[0]); //bug fix for first image swiping RTL
    this.setState({ 
        imgs: trimmed,
        currentImage: trimmed[this.state.currentIndex]
     });
  }

  handleOption = async (affinity) => {
    //console.log('current image=> ', this.state.currentImage);
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
  }

  slideRenderer = (params) => {
    //Working perfectly, limits the amount of images to load and the buffer with overscanslideafter amount
    const { index, key } = params;;
    //console.log('swiped ', index)
    return (
      <div key={key}>
        <Transition 
        animation='zoom' 
        duration={500} 
        visible={this.state.currentIndex === index}
        //visible={true} this will preload the 5 images but transitions are off
        //onHide={()=>{console.log('Hiding done')}}
        >
          <Image style={styles.img} id="splashImage" src={this.state.imgs[index].urls.regular}/>
        </Transition>
      </div>
    );
  }

  increaseIndex = () => {
    this.setState((prev)=>{
      return {
        currentIndex: prev.currentIndex += 1,
        currentImage: prev.imgs[prev.currentIndex]
      }
    })
  }

  simulateLike = (like) => {
    if (like) {
      console.log('Image Liked');
      this.handleOption(true);
      
    } else if (!like) {
      console.log('Image Noped');
      this.handleOption(false);
    }
    this.increaseIndex();
  }

  addOverlay = (num1, type) => {
    const initial = num1.toFixed(0);
    console.log(`${type}ing, initial=${initial} idx=${num1}, currentIndex=${this.state.currentIndex}`);
    //Add the like or nope overlay based on current swipe and hold position here
  }


  slideDirection = (index, lastIndex) => {
    //needs to activate only when letting go of mouse or screen.
    if (index > lastIndex) {
      console.log(`slide Left completed, ${lastIndex} => ${index}`);
      this.simulateLike(false);
    } else if (index < lastIndex){
      console.log(`slide Right completed, ${lastIndex} => ${index}`);
      this.simulateLike(true);
    }
  }

  handleKeyDown = (e) => {
    // Prevents continuous presses
    if (this.state.pressed === false) {
      if (e.keyCode === 37) {
        console.log('left Arrow clicked');
        this.simulateLike(false);
      } else if (e.keyCode === 39) {
        console.log('right Arrow clicked');
        this.simulateLike(true);
      }
      this.setState(()=>{
        return {
          pressed: true
        }
      })
    }
  }

  handleKeyUp = () => {
    this.setState(()=>{
      return {
        pressed: false
      }
    })
  }

  componentWillMount () {
    this.getPics();
  }


  render() {

    return (
      <Container fluid textAlign='center' style={styles.root} tabIndex="1" onKeyDown={ this.handleKeyDown } onKeyUp={ this.handleKeyUp}>
        <Progress indicating percent={Math.round(((this.props.likeProgress / 30) * 100))} progress/>
        <Button circular={true} onClick={()=>{this.simulateLike(false)}} size='small'><Icon name='x' color='red'/>Nope</Button>
        <Button circular={true} onClick={()=>{this.simulateLike(true)}} size='small'><Icon name='like' color='green'/>Like</Button>
  
        <EnhancedSwipeableViews 
        enableMouseEvents
        ignoreNativeScroll={true}
        slideCount={400} 
        slideRenderer={this.slideRenderer} 
        overscanSlideAfter={5}
        onChangeIndex={(idx, idxLast)=>{this.slideDirection(idx, idxLast)}}
        onSwitching={(idx, type)=>{this.addOverlay(idx, type)}}
        index={this.state.currentIndex}
        style={styles.root}
        animateTransitions={false}
        resistance={true}
        hysteresis={0.8}
        />

      </Container>
    )

  }

}

