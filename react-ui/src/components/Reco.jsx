import React, { Component } from 'react';
import { Button, Grid, Icon, Image, Menu, Segment } from 'semantic-ui-react'
import FlickrImages from './FlickrImages';

const lensReco = (lens, i) => {
  console.log('Lens information: ', lens);
  return <Grid key={i} divided verticalAlign='middle' textAlign='left'>
  <Grid.Column width={3}>
    <Image src='https://res.cloudinary.com/nextlens/image/upload/v1544524799/misc/lens1.jpg'/> {lens.name}
  </Grid.Column>
  <Grid.Column width={4}>
    <Button as ='a' href={lens.ebay} target="_blank" >eBay</Button>
    <Button as ='a' href={lens.amazon} target="_blank" ><Icon name='amazon'></Icon></Button>
  </Grid.Column>
  <Grid.Column width={3}>
    <FlickrImages
      images={ [] }
      flickr={ lens.flickr }
      lensname= { lens.name }
    />
  </Grid.Column>
</Grid>
}

export default class Reco extends Component {
  state = { activeItem: this.props.price }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item name='low' active={activeItem === 'low'} onClick={this.handleItemClick} />
          <Menu.Item name='high' active={activeItem === 'high'} onClick={this.handleItemClick} />
        </Menu>
        <Segment attached='bottom'>
        {this.state.activeItem === 'low' ? 
          <div>{this.props.lenses.slice(0, 3).map((lens, i) => {
            return lensReco(lens, i);
          })}</div> :
          <div>{this.props.lenses.slice(3).map((lens, i) => {
            return lensReco(lens, i);
          })}</div>
        }
      </Segment> 
      </div>
    )
  }
}