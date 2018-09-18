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
                    <Card.Description>
                    {this.props.userInformation.about}
                    <br/>
                    <Icon name='camera retro' />
                    Owns X lenses
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <Button onClick={()=>{console.log('update profile handler')}} size='small'>Edit Profile</Button>
                    </Card.Content>
                </Card>
        )
    }
}