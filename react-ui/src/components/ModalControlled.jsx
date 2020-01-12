import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ModalControlled = inputProps => {
  const { message, open, close } = inputProps;
  return (
    <Modal
      open={open}
      onClose={() => close(false, '')}
      basic
      size="small"
      closeOnEscape
      closeOnDimmerClick
    >
      <Modal.Content>
        <h3>{message}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => close(false, '')} inverted>
          <Icon name="checkmark" /> Got it
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalControlled;

ModalControlled.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
