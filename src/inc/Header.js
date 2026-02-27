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

/* ─────────────────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────────────────── */
const NavLinks = () => (
  <ul className="nav-list">
    <li>
      <NavLink to="/" end
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
        Home (Lv 0)
      </NavLink>
    </li>
    <li>
      <NavLink to="/classes"
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
        Classes
      </NavLink>
    </li>
    <li>
      <NavLink to="/resources"
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
        Resources
      </NavLink>
    </li>
    <li>
      <NavLink to="/updates"
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
        Updates
      </NavLink>
    </li>
    <li>
      <NavLink to="/portal"
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
        Portal
      </NavLink>
    </li>
  </ul>
);

const SocialLinks = () => (
  <>
    <a href="https://www.linkedin.com/in/mark-tasaka/" target="_blank"
      rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
      <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
    </a>
    <a href="https://github.com/mark-tasaka" target="_blank"
      rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
      <img src={githubIcon} alt="GitHub" className="social-img" />
    </a>
    <a href="https://www.tasaka-games.com/" target="_blank"
      rel="noopener noreferrer" className="social-icon" aria-label="Tasaka Games">
      <img src={socialMedia1} alt="Tasaka Games" className="social-img" />
    </a>
    <a href="https://marktasaka.ca/work" target="_blank"
      rel="noopener noreferrer" className="social-icon" aria-label="Mark Tasaka Portfolio">
      <img src={socialMedia2} alt="Mark Tasaka Portfolio" className="social-img" />
    </a>
  </>
);

/* ─────────────────────────────────────────────────────────
   Main Header
───────────────────────────────────────────────────── */
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const fullHeaderRef = useRef(null);

  useEffect(() => {
    const header = fullHeaderRef.current;
    if (!header) return;

    // ─────────────────────────────────────────────────────────
    // PRIMARY: IntersectionObserver
    //
    // Watches whether the full header is visible in the VIEWPORT.
    // Completely independent of scroll events — fires correctly
    // in Chrome, Firefox, Safari and Edge regardless of which
    // DOM element is actually doing the scrolling.
    //
    // This is the correct fix for Firefox's strict scroll-event
    // routing: when justify-content:center causes Firefox to
    // create an internal flex scroll context, window.scroll
    // never fires. IntersectionObserver bypasses this entirely.
    // ─────────────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      {
        root: null,        // use the viewport
        rootMargin: '0px',
        threshold: 0,      // fire as soon as any pixel enters/leaves
      }
    );
    observer.observe(header);

    // ─────────────────────────────────────────────────────────
    // FALLBACK: scroll events on window + document (capture)
    //
    // Belt-and-suspenders: handles any remaining edge cases
    // where IntersectionObserver might have a slight delay.
    // document+capture catches scroll from ANY descendant,
    // window catches standard document scroll.
    // ─────────────────────────────────────────────────────────
    const checkSticky = () => {
      const { bottom } = header.getBoundingClientRect();
      setIsSticky(bottom <= 0);
    };

    window.addEventListener('scroll', checkSticky, { passive: true });
    document.addEventListener('scroll', checkSticky, { passive: true, capture: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkSticky);
      document.removeEventListener('scroll', checkSticky, { capture: true });
    };
  }, []);

  return (
    <>
      {/* ── Full header — stays in the normal document flow ── */}
      <header className="header" ref={fullHeaderRef}>
        <div className="header-container">
          <div className="header-social">
            <SocialLinks />
          </div>
          <div className="header-body">
            <div className="header-logo">
              <img src={headerLogo} alt="Goodman Games PDF Character Generators" />
            </div>
            <nav className="header-nav" aria-label="Main navigation">
              <NavLinks />
            </nav>
          </div>
        </div>
      </header>

      {/* ── Sticky header — Portal escapes all parent stacking contexts ── */}
      {ReactDOM.createPortal(
        <header
          className={`header header--sticky${isSticky ? ' header--sticky-visible' : ''}`}
          aria-hidden={!isSticky}
        >
          <div className="header-container header-container--sticky">
            <nav className="header-nav header-nav--sticky" aria-label="Main navigation">
              <NavLinks />
            </nav>
            <div className="header-social header-social--sticky">
              <SocialLinks />
            </div>
          </div>
        </header>,
        document.body
      )}
    </>
  );
};

export default Header;