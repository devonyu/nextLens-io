import React, { Component } from 'react';
import { evenlyDistributedImages } from './utils.js';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { Button, Container, Icon, Image, Progress, Transition } from 'semantic-ui-react';
import axios from 'axios';
import ModalTemplate from './Modal';
const EnhancedSwipeableViews = virtualize(SwipeableViews);
const categories = [null, 'portrait', 'landscape', 'aerial', 'street'];

const styles = {
  root: {
    background: '#1b1c1d',
  },
  img: {
    width: 'auto',
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
    border: '5px solid #00e088',
    borderRadius: '12px',
    opacity: '.5',  
    top: '10%',
    left: '25%',
    transform: 'rotate(-35deg)',
    color: '#00e088',
    padding: '0px 5px 0px 5px',
    width: 'auto',
    animation: 'text-focus-in .3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
  },
  textdislike: {
    position: 'absolute',
    fontSize: '5vw',
    border: '5px solid #ff4643',
    borderRadius: '12px',
    top: '10%',
    right: '25%',
    transform: 'rotate(35deg)',
    color: '#ff4643',
    padding: '0px 5px 0px 5px',
    width: 'auto',
    animation: 'text-focus-in .3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
  }
};

export default class PhotoSwiper extends Component {
  constructor(props) {
  super(props);
  this.state = {
          last: 0,
          liking: 0,
          imgs: [{urls: ''},{urls: ''}],
          currentIndex: 0,
          currentImage: {},
          progress: [],
          ready: this.props.likeProgress >= 30,
          pressed: false,
          modal: false,
          loadingImages: false,
  }
      this.getPics = this.getPics.bind(this);
      this.handleOption = this.handleOption.bind(this);
  }

  getPics = () => {
    this.setState(()=>{
      return {
        loadingImages: true,
      }
    })
    axios({
      method: 'get',
      url: `/photoswiper/${this.props.userInfo.id}/getphotos`,
    }).then(({ data }) => {
      // console.log(`Getting images for user id=${this.props.userInfo.id}, we got: ${data}`);
      Object.keys(data).forEach((category) => {
        data[category].map((imageObject)=> {
          imageObject.category = categories.indexOf(category);
          return imageObject;
        })
      });
      let distributedImages = [];
      if (this.state.imgs.length === 2) {
        distributedImages = evenlyDistributedImages(data);
        console.log('Initiate and load images: ', distributedImages);
      } else {
        distributedImages = this.state.imgs.concat(evenlyDistributedImages(data));
        console.log('Added to imgs=> ', distributedImages);
      }
      this.setState({ 
        imgs: distributedImages,
        currentImage: distributedImages[this.state.currentIndex],
      });
      setTimeout(()=>{this.setState({loadingImages: false})},500);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleOption = async (affinity) => {
    //console.log('current image=> ', this.state.currentImage);
    await axios({
            method: 'post',
            url: `/users/${this.props.userInfo.id}/${this.state.currentImage.category}/${this.state.currentImage.id}`,
            data: {"liked":affinity}
          })
          .then(({ data }) => {
            console.log(`Adding user id=${this.props.userInfo.id} photoid=${this.state.currentImage.id} data=${data}`);
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
            <Image style={styles.img} id="photoSwiperImage" src={this.state.imgs[this.state.currentIndex].regularurl}/>
            <p style={this.state.liking === 0 ? styles.textdefault : this.state.liking > 10 ? styles.textlike : this.state.liking < -10 ? styles.textdislike : styles.textdefault}>{this.state.liking < 0 ? 'NOPE' : 'LIKE'}</p>
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
    setTimeout(()=>{this.increaseIndex()}, 1000);
  }

  addOverlay = (num1, type) => {
    if (num1 > this.state.last) {
      //console.log('disliking');
      this.setState((prev)=>{
        return {
          last: num1,
          liking: prev.liking-=1
        }
      })
    } else if (num1 < this.state.last){
      //console.log('liking');
      this.setState((prev)=>{
        return {
          last: num1,
          liking: prev.liking+=1
        }
      })
    }
    // when user stops dragging image, resets liking
    if (type === 'end') {
      this.setState((prev)=>{
        return {
          liking: 0,
          last: 0
        }
      })
    }
    //Overlay is a bit buggy still..
    //console.log(`current(${num1}) last(${this.state.last}) liking(${this.state.liking})`);
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
        liking: 0
      }
    })
  }

  closeModal = () => {
    this.setState({ modal: false });
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
    if (this.props.likeProgress > 30 && this.state.imgs.length < 3) {
      this.setState(()=>{
        return {
          ready: true,
          modal: true
        }
      })
    }
    this.getPics();
    this.setState(()=>{
      return {
        loadingImages: false,
      }
    })

  }

  componentDidUpdate () {
    // console.log('like Affinity ',this.state.liking, 'last ', this.state.last);
    // console.log('PROGRESS=> ', this.props.likeProgress);
    if (this.props.likeProgress === 30 && this.state.ready === false) {
      console.log('RECS READY, send modal!');
      this.setState(()=>{
        return {
          ready: true,
          modal: true
        }
      })
    }
    console.log('current indx=> ', this.state.currentIndex, ' stateimglength=> ', this.state.imgs.length )
    // check where currentIndex is relative to imgs array to see when we need to add more photos to state
    console.log('Condition to add more photos: ', this.state.currentIndex === this.state.imgs.length - 1); 
    console.log('loadingImages = ', this.state.loadingImages);
    if ((this.state.currentIndex === this.state.imgs.length - 1) && !this.state.loadingImages) {
      console.log('Right here')
      //debugger;
      this.getPics();
    }
  }

  render() {
    return (
      <Container id='plmain' fluid textAlign='center' style={styles.root} tabIndex="1" onKeyDown={ this.handleKeyDown } onKeyUp={ this.handleKeyUp}>
        <Progress indicating percent={Math.round(((this.props.likeProgress / 30) * 100))} progress/>
        <ModalTemplate 
          open={ this.state.modal }
          header={`Recommendations Ready for ${this.props.userInfo.firstname}`}
          content={'Enough Data has been collected, click the Next Lens on the SideBar or below to see your recommendations!'}
          closeUp={ this.closeModal.bind(this) }
          action={ [{ key: 'recommendations', content: 'Show Recommendations', onClick: ()=>{this.props.changeViews('recommendations')}, positive: true }, { key: 'more', content: 'Continue Swiping' }] }
        />
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
          <div id='photoswiperbuttons'>
            <Button circular={true} onClick={()=>{this.simulateLike(false)}} size='small'><Icon name='x' color='red'/>Nope</Button>
            <Button circular={true} onClick={()=>{this.simulateLike(true)}} size='small'><Icon name='like' color='green'/>Like</Button>
          </div>
      </Container>
    )
  }
}

