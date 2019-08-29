import React from 'react';
import './Layout.css';
import { Header } from '../';

export default function Layout({ children }) {
  return (
    <section className="layout">
      <Header title="Client Tracker" />
      <main className="layout-content container">
        {children}
      </main>
    </section>
  )
}