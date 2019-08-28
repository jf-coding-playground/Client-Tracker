import React from 'react';
import './Layout.css';
import { Header } from '../';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content container">
        {children}
      </div>
    </div>
  )
}
