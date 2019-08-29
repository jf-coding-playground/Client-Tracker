import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css';

export default function Header({ title }) {
  return (
    <Navbar className="header">
      <Nav className="mr-auto header-text">
        <Link className="header-link" to="/">{title}</Link>
      </Nav>
    </Navbar>
  )
}
