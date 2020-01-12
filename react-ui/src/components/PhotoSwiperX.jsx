import React from 'react';

import Hammer from 'react-hammerjs';

export default class Hammy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Hammer
        onPanStart={e => console.log('start')}
        onPan={e => console.log('panning')}
        onPanEnd={e => console.log('end')}
        onPanCancel={e => console.log('cancel')}
      >
        {' '}
        <img src="https://randomuser.me/api/portraits/men/42.jpg" />
      </Hammer>
    );
  }
}
