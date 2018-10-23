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
    axios.get(`/users/${this.props.userInfo.id}/likedphotos`)
    .then(({ data }) => {
            const temp = [];
            data.forEach((img)=> {
                temp.push(img.smallurl);
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