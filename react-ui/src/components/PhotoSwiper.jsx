import React, { Component } from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { Button, Container, Icon, Image, Progress, Transition } from 'semantic-ui-react';
import { evenlyDistributedImages } from './utils';
import ModalTemplate from './Modal';

const EnhancedSwipeableViews = virtualize(SwipeableViews);
const categories = [null, 'portrait', 'landscape', 'aerial', 'street'];

const styles = {
  root: {
    background: '#1b1c1d'
  },
  img: {
    width: 'auto'
  },
  textdefault: {
    display: 'none'
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
      imgs: [{ urls: '' }, { urls: '' }],
      currentIndex: 0,
      currentImage: {},
      progress: [],
      ready: this.props.likeProgress >= 30,
      pressed: false,
      modal: false,
      loadingImages: false
    };
    this.getPics = this.getPics.bind(this);
    this.handleOption = this.handleOption.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    if (this.props.likeProgress > 30 && this.state.imgs.length < 3) {
      this.setState(() => ({
        ready: true,
        modal: true
      }));
    }
    this.getPics();
    this.setState(() => ({
      loadingImages: false
    }));
  }

  componentDidUpdate() {
    if (this.props.likeProgress === 30 && this.state.ready === false) {
      console.log('RECS READY, send modal!');
      this.setState(() => ({
        ready: true,
        modal: true
      }));
    }
    if (this.state.currentIndex === this.state.imgs.length - 1 && !this.state.loadingImages) {
      // console.log('Axios call for more photos now!');
      // debugger;
      this.getPics();
    }
  }

  increaseIndex = () => {
    this.setState(prev => ({
      currentIndex: (prev.currentIndex += 1),
      currentImage: prev.imgs[prev.currentIndex]
    }));
  };

  simulateLike = like => {
    if (like) {
      // console.log('Image Liked');
      this.handleOption(true);
    } else if (!like) {
      // console.log('Image Noped');
      this.handleOption(false);
    }
  };

  addOverlay = (num1, type) => {
    if (num1 > this.state.last) {
      // console.log('disliking');
      this.setState(prev => ({
        last: num1,
        liking: (prev.liking -= 1)
      }));
    } else if (num1 < this.state.last) {
      // console.log('liking');
      this.setState(prev => ({
        last: num1,
        liking: (prev.liking += 1)
      }));
    }
    // when user stops dragging image, resets liking
    if (type === 'end') {
      this.setState(prev => ({
        liking: 0,
        last: 0
      }));
    }
  };

  slideDirection = (index, lastIndex) => {
    // needs to activate only when letting go of mouse or screen.
    if (index > lastIndex) {
      // console.log(`slide Left completed, ${lastIndex} => ${index}`);
      this.simulateLike(false);
    } else if (index < lastIndex) {
      // console.log(`slide Right completed, ${lastIndex} => ${index}`);
      this.simulateLike(true);
    }
    this.setState(() => ({
      liking: 0
    }));
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleKeyDown = e => {
    // Prevents continuous presses
    if (this.state.pressed === false) {
      if (e.keyCode === 37) {
        // console.log('left Arrow clicked');
        this.simulateLike(false);
      } else if (e.keyCode === 39) {
        // console.log('right Arrow clicked');
        this.simulateLike(true);
      }
      this.setState(() => ({
        pressed: true
      }));
    }
  };

  handleKeyUp = () => {
    this.setState(() => ({
      pressed: false
    }));
  };

  getPics = () => {
    this.setState(() => ({
      loadingImages: true
    }));
    axios({
      method: 'get',
      url: `/photoswiper/${this.props.userInfo.id}/getphotos`
    })
      .then(({ data }) => {
        // console.log(`Getting images for user id=${this.props.userInfo.id}, we got: ${data}`);
        Object.keys(data).forEach(category => {
          data[category].map(imageObject => {
            imageObject.category = categories.indexOf(category);
            return imageObject;
          });
        });
        let distributedImages = [];
        if (this.state.imgs.length === 2) {
          distributedImages = evenlyDistributedImages(data);
          // console.log('Initiate and load images: ', distributedImages);
        } else {
          distributedImages = this.state.imgs.concat(evenlyDistributedImages(data));
          // console.log('Added to imgs=> ', distributedImages);
        }
        this.setState({
          imgs: distributedImages,
          currentImage: distributedImages[this.state.currentIndex]
        });
        setTimeout(() => {
          this.setState({ loadingImages: false });
        }, 500);
      })
      .catch(error => {
        console.log(error);
      });
  };

  slideRenderer = params => {
    // Working perfectly, limits the amount of images to load and the buffer with overscanslideafter amount
    const { index, key } = params;
    // console.log('swiped ', index)
    return (
      <div key={key}>
        <Transition
          animation="zoom"
          duration={500}
          visible={this.state.currentIndex === index} // will have transtions working correctly
          // visible={true} //this will preload the 5 images but transitions are off
          // onHide={()=>{console.log('Hiding done')}}
        >
          <div id="plwraper" style={styles.wrap}>
            <Image
              style={styles.img}
              id="photoSwiperImage"
              src={this.state.imgs[this.state.currentIndex].regularurl}
            />
            <p
              style={
                this.state.liking === 0
                  ? styles.textdefault
                  : this.state.liking > 10
                  ? styles.textlike
                  : this.state.liking < -10
                  ? styles.textdislike
                  : styles.textdefault
              }
            >
              {this.state.liking < 0 ? 'NOPE' : 'LIKE'}
            </p>
          </div>
        </Transition>
      </div>
    );
  };

  handleOption = async affinity => {
    // console.log('current image=> ', this.state.currentImage);
    try {
      await axios({
        method: 'post',
        url: `/users/${this.props.userInfo.id}/${this.state.currentImage.category}/${
          this.state.currentImage.id
        }`,
        data: { liked: affinity }
      })
        .then(({ data }) => {
          // console.log(
          //   `Adding user id=${this.props.userInfo.id} photoid=${
          //     this.state.currentImage.id
          //   } data=${data}`
          // );
          if (affinity === true) {
            this.props.updateProgress();
          }
        })
        .catch(error => {
          console.log('error adding affinity: ', error);
        });
    } catch (err) {
      console.log('error in handleOption: ', err);
    }
    this.increaseIndex();
  };

  render() {
    return (
      <Container
        id="plmain"
        fluid
        textAlign="center"
        style={styles.root}
        tabIndex="1"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <Progress indicating percent={Math.round((this.props.likeProgress / 30) * 100)} progress />
        <ModalTemplate
          open={this.state.modal}
          header={`Recommendations Ready for ${this.props.userInfo.firstname}`}
          content="Enough Data has been collected, click the Next Lens on the SideBar or below to see your recommendations!"
          closeUp={this.closeModal}
          action={[
            {
              key: 'recommendations',
              content: 'Show Recommendations',
              onClick: () => {
                this.props.changeViews('recommendations');
              },
              positive: true
            },
            { key: 'more', content: 'Continue Swiping' }
          ]}
        />
        <EnhancedSwipeableViews
          enableMouseEvents
          ignoreNativeScroll
          slideCount={400}
          slideRenderer={this.slideRenderer}
          overscanSlideAfter={10}
          onChangeIndex={(idx, idxLast) => {
            this.slideDirection(idx, idxLast);
          }}
          onSwitching={(idx, type) => {
            this.addOverlay(idx, type);
          }}
          index={this.state.currentIndex}
          style={styles.root}
          animateTransitions={false}
          resistance={false}
          hysteresis={0.9}
        />
        <div id="photoswiperbuttons">
          <Button
            circular
            onClick={() => {
              this.simulateLike(false);
            }}
            size="small"
          >
            <Icon name="x" color="red" />
            Nope
          </Button>
          <Button
            circular
            onClick={() => {
              this.simulateLike(true);
            }}
            size="small"
          >
            <Icon name="like" color="green" />
            Like
          </Button>
        </div>
      </Container>
    );
  }
}
