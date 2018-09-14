import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Image, Transition } from 'semantic-ui-react';

export default class Landing extends Component {
    constructor(props) {
        super(props);
		this.state = {
			imgs: [],
            currentIndex: 0,
            animation: 'fly right', 
            duration: 1000, 
            visible: true
        }
        this.getSplashImages = this.getSplashImages.bind(this);
        this.alterPhoto = this.alterPhoto.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.toggleChangeView = this.toggleChangeView.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    toggleChangeView = () => {
        this.props.changeView('photoliker');
    }

    toggleSignup = () => {
        this.props.changeView('signup');
    }

    onLoad(feedItem) {
        this.setState(({ imgs }) => {
          return { imgs: imgs.concat(feedItem) }
        })
      }

    getSplashImages = () => {
		axios.get('/landing')
		.then(({ data }) => {
            const temp = [];
            data.results.forEach((img)=> {
                //if we can determine internet speed we can optimize b/w full/regular/small
                //console.log(img.urls);
                temp.push(img.urls.regular)
            })
            this.setState(function(prevState, props) {
                return {
                    imgs: temp,
                    currentIndex: 0
                }
              })
		})
		.catch((error) => {
		    console.log(error);
		});
    }

    alterPhoto () {
        //create buffer?  load two images and have next images loaded
        let swipeImages = async ()=>{
            this.setState({animation: this.state.animation === 'fly right' ? 'fly left' : 'fly right'});
            await this.toggleVisibility();
            if (this.state.currentIndex === 9) {
              await setTimeout(()=> {this.setState({
                    currentIndex: 0
              })}, 700);
            } else {
                await setTimeout(()=> {this.setState({
                    currentIndex: this.state.currentIndex += 1
                })}, 700);
            }
            await this.toggleVisibility()

        }
        swipeImages();
    }

    componentDidMount () {
        this.getSplashImages();
            setInterval(this.alterPhoto, 8000)
    }

    render() {
        const { animation, duration, visible } = this.state

        return(
            <Container fluid>
                <Container fluid textAlign='center'>
                <h2>Welcome to Nextlens.io</h2>

                <Button basic color='green' size='large' content='Sign up for free' onClick={this.toggleSignup}/>
                </Container>

                <Container>
                    <Transition animation={animation} duration={duration} visible={visible}>
                        <div id="splashImage" className="card" content='Run'>
                            <Image
                                src={this.state.imgs[this.state.currentIndex]}
                                rounded
                            />
                        </div>
                    </Transition>
                </Container>
            {/* Load images to DOM to have them ready */}
             <span className="hidden">
                {this.state.imgs.map((item, i) =>
                    <img 
                        src={item} 
                        onLoad={this.onLoad.bind(this, item)} 
                        key={i}
                        alt='placeholder'
                    />
                )}
            </span>
            </Container>


        )
    }
}
