// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage  from './HomePage';
import Resources from './Resources';
import Header    from './inc/Header';
import Hero      from './inc/Hero';
import Footer    from './inc/Footer';

/* Reusable shell for routes that need Header + Hero + Footer */
const AppShell = ({ children }) => (
  <div className="App">
    <Header />
    <Hero />
    <main className="main-content">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Home — full shell with Hero */}
        <Route path="/" element={<AppShell><HomePage /></AppShell>} />

        {/* Resources — self-contained, owns its own Header + Footer, no Hero */}
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;