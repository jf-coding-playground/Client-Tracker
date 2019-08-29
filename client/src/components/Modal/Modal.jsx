import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css';

export default function ModalComponent({ children, show, onClose, title }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}
