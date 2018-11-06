import React, { Component } from 'react';
import { Button, Container, Grid, Segment, Icon, Divider } from 'semantic-ui-react'

export default class Footer extends Component {
    render() {
        return (
            <Container id='footer' fluid >
              <Grid columns={3} relaxed>
                <Grid.Column id='ft1' inverted href='https://www.nextlens.io'>
                    <Segment basic inverted >
                    <Icon name='camera retro'></Icon>NextLens.io
                    </Segment>
                </Grid.Column>

                <Divider vertical fitted/>

                <Grid.Column id='ft2' inverted>
                    <Segment basic inverted>Terms && Usage</Segment>
                </Grid.Column>

                <Divider vertical fitted/>
                
                <Grid.Column id='ft3' inverted>
                    <Segment basic inverted>
                        <Button circular color='facebook' icon='facebook' href='https://www.facebook.com/nextlens.io/'/>
                        <Button circular color='white' icon='github' href='https://github.com/devonyu/nextLens-io'/>
                        <Button circular color='twitter' icon='twitter' href='https://twitter.com/nextlens'/>
                        <Button circular color='instagram' icon='instagram' href='https://www.instagram.com/nextlens.io/'/>
                        <Button circular color='pink' icon='flickr' href='https://www.flickr.com/photos/nextlens'/>
                    </Segment>
                </Grid.Column>
                
            </Grid>
            </Container>    
        )
    }
}
