import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ZeroLevelGenerator from './character/zeroLv';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<ZeroLevelGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;