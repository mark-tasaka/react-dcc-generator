// src/inc/Header.js
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo   from './img/header6.png';
import linkedinIcon from './img/linkedin.png';
import githubIcon   from './img/github.png';
import socialMedia1 from './img/social-media1.png';
import socialMedia2 from './img/social-media2.png';

/* ─────────────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────────────── */
const NavLinks = () => (
  <ul className="nav-list">
    <li>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link--active' : 'nav-link'
        }
      >
        Home (Lv 0)
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/classes"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link--active' : 'nav-link'
        }
      >
        Classes
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/resources"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link--active' : 'nav-link'
        }
      >
        Resources
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/updates"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link--active' : 'nav-link'
        }
      >
        Updates
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/portal"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link--active' : 'nav-link'
        }
      >
        Portal
      </NavLink>
    </li>
  </ul>
);

const SocialLinks = () => (
  <>
    <a
      href="https://www.linkedin.com/in/mark-tasaka/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="LinkedIn"
    >
      <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
    </a>
    <a
      href="https://github.com/mark-tasaka"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="GitHub"
    >
      <img src={githubIcon} alt="GitHub" className="social-img" />
    </a>
    <a
      href="https://www.tasaka-games.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="Tasaka Games"
    >
      <img src={socialMedia1} alt="Tasaka Games" className="social-img" />
    </a>
    <a
      href="https://marktasaka.ca/work"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="Mark Tasaka Portfolio"
    >
      <img src={socialMedia2} alt="Mark Tasaka Portfolio" className="social-img" />
    </a>
  </>
);

/* ─────────────────────────────────────────────────────
   Main Header
───────────────────────────────────────────────────── */
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const fullHeaderRef = useRef(null);

  useEffect(() => {
    const checkSticky = () => {
      if (!fullHeaderRef.current) return;

      // getBoundingClientRect().bottom is the distance from the TOP of the
      // viewport to the BOTTOM edge of the full header.
      // When it drops to 0 or below, the header has fully left the viewport.
      const { bottom } = fullHeaderRef.current.getBoundingClientRect();
      setIsSticky(bottom <= 0);
    };

    // Run once on mount so a pre-scrolled page load works correctly
    checkSticky();

    window.addEventListener('scroll', checkSticky, { passive: true });
    return () => window.removeEventListener('scroll', checkSticky);
  }, []);

  return (
    <>
      {/* ── Full header — stays in the normal document flow ── */}
      <header className="header" ref={fullHeaderRef}>
        <div className="header-container">

          {/* Row 1: Social Icons */}
          <div className="header-social">
            <SocialLinks />
          </div>

          {/* Rows 2 & 3: Logo + Nav */}
          <div className="header-body">
            <div className="header-logo">
              <img
                src={headerLogo}
                alt="Goodman Games PDF Character Generators"
              />
            </div>
            <nav className="header-nav" aria-label="Main navigation">
              <NavLinks />
            </nav>
          </div>

        </div>
      </header>

      {/*
        ── Sticky header — rendered via React Portal directly onto <body>.
           This COMPLETELY escapes any parent transform / overflow / z-index
           stacking context that would prevent position:fixed from anchoring
           to the true viewport.
      ── */}
      {ReactDOM.createPortal(
        <header
          className={`header header--sticky${isSticky ? ' header--sticky-visible' : ''}`}
          aria-hidden={!isSticky}
        >
          <div className="header-container header-container--sticky">

            {/* Nav — left */}
            <nav
              className="header-nav header-nav--sticky"
              aria-label="Main navigation"
            >
              <NavLinks />
            </nav>

            {/* Social icons — right */}
            <div className="header-social header-social--sticky">
              <SocialLinks />
            </div>

          </div>
        </header>,
        document.body   // ← mounts outside the React tree, directly on <body>
      )}
    </>
  );
};

export default Header;