import React, { Component } from 'react';
import { Button, Grid, Image, Input } from 'semantic-ui-react'
import axios from 'axios';

let imageGroups = {
    canonfifty: '2800875@N25',
    mavicpro: '3049151@N20',
    sigmatentwenty: '94829136@N00',
    tamronseventeenfifty: '37412600@N00',
    canoneightyfiveonetwo: '84346957@N00'
}
// Having a loading screen before mounting component when algorithm is loading.
// Progress bar or another animated loading object for a better ui/ux.
// Also lazy load images from Flickr for better UI
// Current making calls to Flickr server endpoint to get latest images.  Cache them to state or (local session) so user will do less calls.

export default class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
          photos: [],
          show: true,
          current: '2800875@N25',
          tag: ''
        }
    }

    changePool = async (groupId) => {
        await this.setState(()=> {
            return {
                current: groupId
            }
        })
        await this.loadImages(this.state.current);
    }

    loadImages(groupId) {
        console.log(groupId);
        axios.get(`/flickr/${groupId}`)
        .then(({ data }) => {
                const temp = [];
                console.log('First Image EX: ', data.photos.photo[0]);
                data.photos.photo.forEach((img)=> {
                    // current pushing only links.  we can get photographer, title, and camera (can tag camera and specific category for more detailed results)
                    temp.push(img);
                })
                this.setState(() => {
                    return {
                        photos: temp,
                    };
                  });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        console.log('recommendations mounted, axios call to DB for algorithm!');
        this.loadImages(this.state.current);
    }

    render() {
        let images = this.state.photos.map((image, i) => {
            return  <Grid.Column key={i} mobile={4} tablet={4} computer={4}>
                      <Image src={image.url_c} />
                    </Grid.Column>
         });
        return(
            <div>
                <div>
                    <h1>Recommendations HERE</h1>
                    <Button onClick={()=> this.setState(()=> {return {show: !this.state.show}})}>Display</Button>
                    <Input icon='search' placeholder='Experimental Tag Search' />
                    <ul>
                        <li><Button onClick={()=>{this.changePool(imageGroups.canonfifty)}}>Show Images taken by Canon 50MM F1.8 STM</Button></li>
                        <li><Button onClick={()=>{this.changePool(imageGroups.mavicpro)}}>Show Images taken by DJI Mavic Pro</Button></li>
                        <li><Button onClick={()=>{this.changePool(imageGroups.sigmatentwenty)}}>Show Images taken by Sigma 10-20mm F3.5</Button></li>
                        <li><Button onClick={()=>{this.changePool(imageGroups.tamronseventeenfifty)}}>Show Images taken by Tamron 17-50mm F2.8</Button></li>
                        <li><Button onClick={()=>{this.changePool(imageGroups.canoneightyfiveonetwo)}}>Show Images taken by Canon 85mm F1.2</Button></li>
                    </ul>
                </div>
                <Grid relaxed>
                    { this.state.show === false ? '' : images }
			    </Grid>	
            </div>
        )
    }
}