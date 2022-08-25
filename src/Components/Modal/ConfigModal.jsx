import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_ClOSE, MODAL_ACTION_CONFIRM } from 'Redux/type/ConfirmType'
export default function ConfigModal(props) {
  const { title, content, show, onAction } = props
  return (
    <Modal show={show} onHide={() => onAction(MODAL_ACTION_ClOSE)}>
      <Modal.Header closeButton>
        <Modal.Title className='h5' style={{ fontWeight:'600' }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction( MODAL_ACTION_ClOSE )}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
