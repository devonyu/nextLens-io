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
    height: 'auto'
  },
  textdefault: {
    display: 'none',
  },
  wrap: {
    textalign: 'center',
    position: 'relative'
  },
  textlike: {
    position: 'absolute',
    fontSize: '5vw',
    borderRadius: '25px',
    opacity: '.5',  
    top: '10%',
    left: '50%',
    color: 'green',
    width: 'auto',
    transform: 'translate(-50%, -50%)',
    animation: 'text-focus-in .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
  },
  textdislike: {
    position: 'absolute',
    fontSize: '5vw',
    top: '10%',
    left: '50%',
    color: 'red',
    width: 'auto',
    transform: 'translate(-50%, -50%)',
    animation: 'text-focus-in .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
  }
};

export default class PhotoSwiper extends Component {
  constructor(props) {
  super(props);
  this.state = {
          start: null,
          liking: 0,
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
        visible={this.state.currentIndex === index} //will have transtions working correctly
        //visible={true} //this will preload the 5 images but transitions are off
        //onHide={()=>{console.log('Hiding done')}}
        >
          <div id="plwraper" style={styles.wrap}>
            <Image style={styles.img} id="splashImage" src={this.state.imgs[index].urls.regular}/>
            <p style={this.state.liking === 0 ? styles.textdefault : this.state.liking > 0 ? styles.textlike : styles.textdislike}>{this.state.liking <= 0 ? 'Nope' : 'Like'}</p>
          </div>
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
    setTimeout(()=>{this.increaseIndex()}, 500);
  }

  addOverlay = (num1, type) => {
    const initial = num1;
    if (this.state.start === null) {
      this.setState(()=>{
        return {
          start: initial
        }
      })
    }

    //console.log(`Currently: ${type}, initial=${initial} num1=${num1}, currentIndex=${this.state.currentIndex}`);
    
    if (num1 > this.state.start) {
      console.log('disliking');
      this.setState((prev)=>{
        return {
          liking: -1
        }
      })
    } else if (num1 < this.state.start){
      console.log('liking');
      this.setState((prev)=>{
        return {
          liking: 1
        }
      })
    }

    // when user stops dragging image, resets liking
    if (type === 'end') {
      this.setState((prev)=>{
        return {
          liking: 0,
        }
      })
    }

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
    this.setState(()=>{
      return {
        start: null,
        liking: 0
      }
    })
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

  componentDidUpdate () {
    console.log('like Affinity',this.state.liking)
    console.log('PROGRESS=> ', this.props.likeProgress);
    if (this.props.likeProgress === 30) {
      alert('RECS READY');
    } else if (this.props.likeProgress > 30) {
      console.log('let user know recs are ready');
    }
  }

  render() {

    return (
      <Container id='plmain' fluid textAlign='center' style={styles.root} tabIndex="1" onKeyDown={ this.handleKeyDown } onKeyUp={ this.handleKeyUp}>
        <Progress indicating percent={Math.round(((this.props.likeProgress / 30) * 100))} progress/>
        <Button circular={true} onClick={()=>{this.simulateLike(false)}} size='small'><Icon name='x' color='red'/>Nope</Button>
        <Button circular={true} onClick={()=>{this.simulateLike(true)}} size='small'><Icon name='like' color='green'/>Like</Button>
  
        <EnhancedSwipeableViews 
        enableMouseEvents
        ignoreNativeScroll={true}
        slideCount={400} 
        slideRenderer={this.slideRenderer} 
        overscanSlideAfter={10}
        onChangeIndex={(idx, idxLast)=>{this.slideDirection(idx, idxLast)}}
        onSwitching={(idx, type)=>{this.addOverlay(idx, type)}}
        index={this.state.currentIndex}
        style={styles.root}
        animateTransitions={false}
        resistance={false}
        hysteresis={0.9}
        />

      </Container>
    )

  }

}

