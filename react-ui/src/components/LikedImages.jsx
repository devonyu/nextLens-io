import _ from 'lodash'
import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const images = _.times(16, i => (
  <Grid.Column key={i}>
    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
  </Grid.Column>
))

const LikedImages= () => <Grid>{images}</Grid>

export default LikedImages