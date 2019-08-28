import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css';

export default function Header() {
  return (
    <Navbar>
      <Nav className="mr-auto navbar-text">
        Client Tracker
      </Nav>
    </Navbar>
  )
}
