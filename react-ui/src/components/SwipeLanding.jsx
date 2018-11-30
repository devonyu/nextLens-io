import React, { Component } from 'react';
import axios from 'axios';
import { Container, Image } from 'semantic-ui-react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class SwipeLanding extends Component {
    constructor(props) {
        super(props);
		this.state = {
			imgs: [],
            currentIndex: 0,
        }
        this.getSplashImages = this.getSplashImages.bind(this);
    }

    getSplashImages = () => {
		axios.get('/landing')
		.then(({ data }) => {
            let temp = [];
            data.results.forEach((img)=> {
                //console.log(img);
                temp.push(img.urls.regular);
            })
            //lower the bandwith by changing amount of images to load
            //depending on device/internet speeds, we can alter this number
            temp = temp.slice(0, 5);
            this.setState(() => {
                return {
                    imgs: temp,
                    currentIndex: 0
                };
            });
		})
		.catch((error) => {
		    console.log(error);
		});
    }

    componentDidMount () {
        this.getSplashImages();
    }

    render() {
        return(
                <Container id="splashWrap">
                    <AutoPlaySwipeableViews 
                    enableMouseEvents
                    animateTransitions
                    resistance
                    autoplay
                    interval={6000}
                    >
                        {this.state.imgs.map((image, i) => {
                            return <div key={i}>
                                <Image id="splashImage" src={image}/>
                            </div>
                        })}
                    </AutoPlaySwipeableViews>
                </Container>
        )
    }
}