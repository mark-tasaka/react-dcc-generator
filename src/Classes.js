// src/Classes.js
import React from 'react';
import Header from './inc/Header';
import Footer from './inc/Footer';
import './App.css';

const Classes = () => {
  return (
    <div className="App" id="top">
      <Header />
      <main className="main-content">
        <div className="resources-page">

          <h1 className="classes-section-title">Under Construction</h1>

          <p className="resources-description">
            The PDF character class generators are under construction. For the earlier
            iterations of DCC/MCC character class generators, please visit{' '}
            <a
              href="https://www.oldschooladventures.org/dcc2/"
              target="_blank"
              rel="noopener noreferrer"
              className="classes-link"
            >
              Mighty Deeds and Old School Adventures
            </a>
            {' '}(DCC),{' '}
            <a
              href="https://www.oldschooladventures.org/mcc2/"
              target="_blank"
              rel="noopener noreferrer"
              className="classes-link"
            >
              Pathways to the Ancient Ones
            </a>
            {' '}(MCC) and{' '}
            <a
              href="https://www.tasaka-games.com/dcc_ea/"
              target="_blank"
              rel="noopener noreferrer"
              className="classes-link"
            >
              DCC Eastern Adventures Redux
            </a>
            {' '}(DCC Eastern Adventures).
          </p>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Classes;