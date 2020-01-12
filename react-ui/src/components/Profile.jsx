import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { getMount, mounts } from './utils';
import defaultpicture from '../images/defaultpicture.jpg';

const Profile = props => {
  const addDefaultImage = ev => {
    ev.target.src = defaultpicture;
  };

  return (
    <Card>
      <Image
        onError={ev => {
          addDefaultImage(ev);
        }}
        src={props.userInformation.profileimgurl || defaultpicture}
      />
      <Card.Content>
        <Card.Header>{props.userInformation.firstname}</Card.Header>
        <Card.Meta>{getMount(props.userInformation.mount, mounts)}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default Profile;
