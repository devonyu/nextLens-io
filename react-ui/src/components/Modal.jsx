import React from 'react'
import { Modal } from 'semantic-ui-react'

const ModalTemplate = (props) => (
  <Modal
    closeIcon
    dimmer={'blurring'}
    open={props.open}
    header={props.header}
    content={props.content}
    onClose={props.closeUp}
    actions={props.action}
  />
)

export default ModalTemplate