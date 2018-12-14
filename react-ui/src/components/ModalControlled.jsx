import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default class ModalControlled extends Component {
  state = { modalOpen: false };

  componentWillReceiveProps(props) {
    if (props.open) {
      this.handleOpen();
    }
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    const { close } = this.props;
    this.setState({ modalOpen: false });
    close(false, '');
  };

  render() {
    const { message } = this.props;
    const { modalOpen } = this.state;
    return (
      <Modal
        open={modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
        closeOnEscape
        closeOnDimmerClick
      >
        <Modal.Content>
          <h3>{message}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
                              </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalControlled.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
