// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage  from './HomePage';
import Resources from './Resources';
import Classes   from './Classes';  
import Updates   from './Updates';      
import Header    from './inc/Header';
import Hero      from './inc/Hero';
import Footer    from './inc/Footer';

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
    <Router basename="/dccpdf">
      <Routes>
        <Route path="/" element={<AppShell><HomePage /></AppShell>} />
        <Route path="/classes" element={<Classes />} /> 
        <Route path="/resources" element={<Resources />} />
        <Route path="/updates" element={<Updates />} /> 
      </Routes>
    </Router>
  );
}

export default App;