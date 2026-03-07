import React, { useState } from 'react';
import DccLv0 from './generator/dccLv0';
import lv0Title from './img/lv0title.png';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="home-page">

      {/* ── Intro paragraph ── */}
      <p className="home-intro">
        Welcome to Goodman Games PDF Character Generators, a fan-created website dedicated to Goodman
        Games' Dungeon Crawl Classics genre of old-school role-playing games. This website builds on
        earlier DCC character generators I designed, featuring the ability to randomly generate
        characters as PDF character sheets. If you have any questions or would like to reach out,
        please contact me at{' '}
        <a href="mailto:dccfanforlife@gmail.com" className="home-intro-link">
          dccfanforlife@gmail.com
        </a>.
      </p>

      {/* ── Level 0 section ── */}
      <div className="home-section">

        {/* Section title image */}
        {/* <h1><img
          src={lv0Title}
          alt="Level 0 Character Generators"
          className="home-section-title-img"
        />
        </h1> */}

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

        {/* ── Accordion ── */}
        <div className="accordion">
          <button
            className="accordion-toggle"
            onClick={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
          >
            <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            <span className="accordion-label">DCC Level 0 Character Generator</span>
          </button>

          <div className={`accordion-content${isOpen ? ' accordion-content--open' : ''}`}>
            <DccLv0 />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;