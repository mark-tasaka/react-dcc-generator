// src/Updates.js
import React from 'react';
import Header from './inc/Header';
import Footer from './inc/Footer';
import './App.css';

const Updates = () => {
  return (
    <div className="App" id="top">
      <Header />
      <main className="main-content">
        <div className="resources-page">

          <h1 className="updates-section-title">Updates</h1>

          {/* ── Update Entry ── */}
          <div className="updates-entry">
            <p className="updates-date">April 26, 2026</p>
            <p className="resources-description">
              Welcome to the launch of Goodman Games PDF Character Generators, which
              produces random generator characters in PDF format. This website builds
              on earlier Goodman Games character generators I designed (please see{' '}
              <a
                href="https://oldschooladventures.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="classes-link"
              >
                Portal
              </a>
              {' '}for details). This website is a work-in-progress, with new
              generators/materials will be added on an ongoing basis.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Updates;