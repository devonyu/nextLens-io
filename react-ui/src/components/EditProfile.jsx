import React, { Component } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { mounts } from './utils.js';

export default class EditProfile extends Component {
    getMount(mountNumber) {
        for (let key of mounts) {
            if (key.value === mountNumber) {
                return key.text;
            }
        }
    }
    render() {
        return(
                <Card>
                    <Image src={this.props.userInformation.profileimgurl || 'https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg'} rounded/>
                    <Card.Content>
                        <Card.Header>{this.props.userInformation.firstname}</Card.Header>
                        <Card.Meta>{this.getMount(this.props.userInformation.mount)}</Card.Meta>
                        <Card.Description>
                        {this.props.userInformation.about}
                        <br/>
                        <Icon name='camera retro' />
                        Owns X lenses
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Button onClick={()=>{console.log('SAVE BUTTON CLICKED IN SIDE EDIT PF')}} size='small'>SAVE Profile</Button>
                    </Card.Content>
                </Card>
        )
    }
}