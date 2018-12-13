import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { getMount, mounts } from './utils';

const Profile = props => (
  <Card>
    <Image
      src={
        props.userInformation.profileimgurl ||
        'https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg'
      }
    />
    <Card.Content>
      <Card.Header>{props.userInformation.firstname}</Card.Header>
      <Card.Meta>{getMount(props.userInformation.mount, mounts)}</Card.Meta>
    </Card.Content>
  </Card>
);

export default Profile;
