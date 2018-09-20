import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import axios from 'axios';

export default class LikedImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    }
  }

  componentDidMount() {
    // Holder till we get real images from DB
    axios.get('/landing')
    .then(({ data }) => {
            const temp = [];
            data.results.forEach((img)=> {
                temp.push(img.urls.small)
            })
            this.setState(function(prevState, props) {
                return {
                    photos: temp,
                };
              });
    })
    .catch((error) => {
        console.log(error);
    });
  }

  render() {
    let images = this.state.photos.map((image, i) => {
      return  <Grid.Column key={i} mobile={4} tablet={4} computer={4}>
                <Image src={image} />
              </Grid.Column>
   });
    return (
      <Grid relaxed>
        { images }
			</Grid>	
    )
  }
}