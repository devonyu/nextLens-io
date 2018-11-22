import React, { Component } from 'react';
import { Button, Container, Grid, Segment, Icon, Divider } from 'semantic-ui-react'

export default class Footer extends Component {
    render() {
        return (
            <Container id='footer' fluid >
              <Grid columns={3} relaxed>
                <Grid.Column id='ft1' inverted="true">
                    <Segment basic inverted={true}>
                    <Icon name='camera retro'></Icon><a href='https://www.nextlens.io'>NextLens.io</a>
                    </Segment>
                </Grid.Column>

                <Divider vertical fitted/>

                <Grid.Column id='ft2' inverted="true">
                    <Segment basic inverted={true}>Terms && Usage</Segment>
                </Grid.Column>

                <Divider vertical fitted/>
                
                <Grid.Column id='ft3' inverted="true">
                    <Segment basic inverted={true}>
                        <Button circular color='facebook' icon='facebook' href='https://www.facebook.com/nextlens.io/'/>
                        <Button circular color='grey' icon='github' href='https://github.com/devonyu/nextLens-io'/>
                        <Button circular color='twitter' icon='twitter' href='https://twitter.com/nextlens'/>
                        <Button circular color='instagram' icon='instagram' href='https://www.instagram.com/nextlens.io/'/>
                    </Segment>
                </Grid.Column>
                
            </Grid>
            </Container>    
        )
    }
}
