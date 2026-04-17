// src/inc/Footer.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import footerLogo   from './img/footer/footerLogo.png';
import linkedinIcon from './img/header/linkedin.png';
import githubIcon   from './img/header/github.png';
import socialMedia1 from './img/header/social-media1.png';
import socialMedia2 from './img/header/social-media2.png';

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
const NavLinks = () => (
  <ul className="footer-nav-list">
    <li>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'footer-nav-link footer-nav-link--active' : 'footer-nav-link'
        }
      >
        Home (Lv 0)
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/classes"
        className={({ isActive }) =>
          isActive ? 'footer-nav-link footer-nav-link--active' : 'footer-nav-link'
        }
      >
        Classes
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/resources"
        className={({ isActive }) =>
          isActive ? 'footer-nav-link footer-nav-link--active' : 'footer-nav-link'
        }
      >
        Resources
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/updates"
        className={({ isActive }) =>
          isActive ? 'footer-nav-link footer-nav-link--active' : 'footer-nav-link'
        }
      >
        Updates
      </NavLink>
    </li>

    {/* ── External link ── */}
    <li>
      <a
        href="https://oldschooladventures.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-nav-link"
      >
        Portal
      </a>
    </li>

    {/* ── Email link ── */}
    <li>
      <a
        href="mailto:dccfanforlife@gmail.com"
        className="footer-nav-link"
      >
        Contact
      </a>
    </li>
  </ul>
);

const SocialLinks = () => (
  <div className="footer-social">
    <a
      href="https://www.linkedin.com/in/mark-tasaka/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label="LinkedIn"
    >
      <img src={linkedinIcon} alt="LinkedIn" className="footer-social-img" />
    </a>
    <a
      href="https://github.com/mark-tasaka"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label="GitHub"
    >
      <img src={githubIcon} alt="GitHub" className="footer-social-img" />
    </a>
    <a
      href="https://www.tasaka-games.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label="Tasaka Games"
    >
      <img src={socialMedia1} alt="Tasaka Games" className="footer-social-img" />
    </a>
    <a
      href="https://marktasaka.ca/work"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label="Mark Tasaka Portfolio"
    >
      <img src={socialMedia2} alt="Mark Tasaka Portfolio" className="footer-social-img" />
    </a>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Main Footer
───────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-grid">

        {/* ── Column 1 — Navigation ── */}
        <nav className="footer-col footer-col--nav" aria-label="Footer navigation">
          <NavLinks />
        </nav>

        {/* ── Column 2 — Logo ── */}
        <div className="footer-col footer-col--logo">
          <img
            src={footerLogo}
            alt="Goodman Games PDF Character Generators"
            className="footer-logo-img"
          />
        </div>

        {/* ── Column 3 — Info + Social ── */}
        <div className="footer-col footer-col--info">
          <p className="footer-text">
            Dungeons/Mutant Crawl Classics are trademarks of Goodman Games.
          </p>
          <p className="footer-text">
            The Goodman Games PDF Characters Generator is a fan-created site
            dedicated to DCC/MCC community.
          </p>
          <SocialLinks />
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;