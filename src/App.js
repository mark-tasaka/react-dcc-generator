import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Header from './inc/Header';
import Hero from './inc/Hero';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Hero />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;