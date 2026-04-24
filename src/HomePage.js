import React, { useState } from 'react';
import DccLv0 from './character/dccLv0';
import MccLv0 from './character/mccLv0';
import EALv0 from './character/eaLv0';
import EoeLv0 from './character/eoeLv0';
import ObfuscatedEmail from './ObfuscatedEmail'; 

const HomePage = () => {
  const [isDccOpen, setIsDccOpen] = useState(true);   // DCC open by default
  const [isMccOpen, setIsMccOpen] = useState(false);  // MCC closed by default
  const [isEaOpen, setIsEaOpen] = useState(false);   // EA closed by default
  const [isEoeOpen, setIsEoeOpen] = useState(false);   // EOE closed by default

  return (
    <div className="home-page">

      {/* ── Intro paragraph ── */}
      <p className="home-intro">
        Welcome to Goodman Games PDF Character Generators, a fan-created website dedicated to Goodman
        Games' Dungeon Crawl Classics genre of old-school role-playing games. This website builds on
        earlier DCC character generators I designed, featuring the ability to randomly generate
        characters as PDF character sheets. If you have any questions or would like to reach out,
        please contact me at{' '}
        <ObfuscatedEmail className="home-intro-link" />.
      </p>

      {/* ── Level 0 section ── */}
      <div className="home-section">

        <h1 className="home-section-title">Level Zero Character Generators</h1>

        {/* Description paragraphs */}
        <div className="home-descriptions">
          <p className="home-description">
            The Character Funnel is a unique feature of the Dungeon Crawl Classics role-playing system;
            it is the starting point of every new DCC campaign. A band of lowly zero-level peasants,
            armed only with the tools of their humble occupations, sets off on an adventure to prove
            themselves worthy of being called adventurers. Most will perish on this first adventure, but
            those few who survive will earn the right to choose a character class and begin new lives as
            first-level characters.
          </p>

          <p className="home-description">
            The Zero-Level Character Generators are designed to allow players and Judges (the DCC term
            for GMs) to quickly generate zero-level characters. This generator offers options for
            increasing character survivability by modifying the 3d6 ability score rolls and by
            maximizing starting hit points.
          </p>
        </div>

        {/* ── Accordion Group ── */}
        <div className="accordion-group">

          {/* ── DCC Accordion ── */}
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={() => setIsDccOpen(prev => !prev)}
              aria-expanded={isDccOpen}
            >
              <span className="accordion-icon">{isDccOpen ? '−' : '+'}</span>
              <span className="accordion-label">DCC Level 0 Character Generator</span>
            </button>

            <div className={`accordion-content${isDccOpen ? ' accordion-content--open' : ''}`}>
              <DccLv0 />
            </div>
          </div>

          {/* ── MCC Accordion ── */}
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={() => setIsMccOpen(prev => !prev)}
              aria-expanded={isMccOpen}
            >
              <span className="accordion-icon">{isMccOpen ? '−' : '+'}</span>
              <span className="accordion-label">MCC Level 0 Character Generator</span>
            </button>

            <div className={`accordion-content${isMccOpen ? ' accordion-content--open' : ''}`}>
              <MccLv0 />
            </div>
          </div>

          {/* ── EA Accordion ── */}
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={() => setIsEaOpen(prev => !prev)}
              aria-expanded={isEaOpen}
            >
              <span className="accordion-icon">{isEaOpen ? '−' : '+'}</span>
              <span className="accordion-label">DCC Eastern Adventures Level 0 Character Generator</span>
            </button>

            <div className={`accordion-content${isEaOpen ? ' accordion-content--open' : ''}`}>
              <EALv0 />
            </div>
          </div>

          {/* ── Empire of the East Accordion ── */}
          <div className="accordion">
            <button
              className="accordion-toggle"
              onClick={() => setIsEoeOpen(prev => !prev)}
              aria-expanded={isEoeOpen}
            >
              <span className="accordion-icon">{isEoeOpen ? '−' : '+'}</span>
              <span className="accordion-label">DCC Empire of the East Level 0 Character Generator</span>
            </button>

            <div className={`accordion-content${isEoeOpen ? ' accordion-content--open' : ''}`}>
              <EoeLv0 />
            </div>
          </div>


        </div>
      </div>
    </div>
  );  
};

export default HomePage;