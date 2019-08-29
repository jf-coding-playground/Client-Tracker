import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent({ children, show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton/>
      <Modal.Body>
        { children }
      </Modal.Body>
    </Modal>
  )
}
