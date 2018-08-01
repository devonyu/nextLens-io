import React, { Component } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';

export default class Profile extends Component {
    render() {
        return(
                <Card>
                    <Image src={this.props.userInformation.profileimgurl} />
                    <Card.Content>
                    <Card.Header>{this.props.userInformation.firstname}</Card.Header>
                    <Card.Meta>Current Mount: {this.props.userInformation.mount}</Card.Meta>
                    <Card.Description>{this.props.userInformation.about}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        Testing Card Features
                    </a>  
                    <a>
                        <Icon name='camera retro' />
                        How many lenses do you own?
                    </a>
                    <Button onClick={()=>{console.log('update profile handler')}} size='small'>Ability to update profile</Button>
                    </Card.Content>
                </Card>
        )
    }
}