// src/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo from './img/header.png';
import socialMedia1 from './img/social-media1.png';
import socialMedia2 from './img/social-media2.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

        {/* ── Top Row: Logo (left) + Social Icons (right) ── */}
        <div className="header-top">

          {/* Logo */}
          <div className="header-logo">
            <img
              src={headerLogo}
              alt="Goodman Games PDF Character Generators"
            />
          </div>

          {/* Social Media Icons */}
          <div className="header-social">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mark-tasaka/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 30 24" className="social-svg">
                <path d="M19.6,19v-5.8c0-1.4-0.5-2.4-1.7-2.4c-1,0-1.5,0.7-1.8,1.3C16,12.3,16,12.6,16,13v6h-3.4
                  c0,0,0.1-9.8,0-10.8H16v1.5c0,0,0,0,0,0h0v0C16.4,9,17.2,7.9,19,7.9c2.3,0,4,1.5,4,4.9V19H19.6z M8.9,6.7L8.9,6.7
                  C7.7,6.7,7,5.9,7,4.9C7,3.8,7.8,3,8.9,3s1.9,0.8,1.9,1.9C10.9,5.9,10.1,6.7,8.9,6.7z M10.6,19H7.2V8.2h3.4V19z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mark-tasaka"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 30 24" className="social-svg">
                <path d="M15,4c-4.5,0-8.2,3.7-8.2,8.2c0,3.6,2.4,6.7,5.6,7.8c0.4,0.1,0.6-0.2,0.6-0.4c0-0.2,0-0.8,0-1.5
                  c-2.3,0.5-2.8-1-2.8-1c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5c0.8,0.1,1.3,0.8,1.3,0.8c0.7,1.3,1.9,0.9,2.4,0.7
                  c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.7-0.9-3.7-4.1c0-0.9,0.3-1.6,0.8-2.2c-0.1-0.2-0.4-1,0.1-2.2c0,0,0.7-0.2,2.3,0.8
                  C13.6,8.1,14.3,8,15,8c0.7,0,1.4,0.1,2.1,0.3c1.6-1.1,2.3-0.8,2.3-0.8c0.4,1.1,0.2,2,0.1,2.2c0.5,0.6,0.8,1.3,0.8,2.2
                  c0,3.2-1.9,3.8-3.7,4c0.3,0.3,0.6,0.8,0.6,1.5c0,1.1,0,2,0,2.3c0,0.2,0.1,0.5,0.6,0.4c3.3-1.1,5.6-4.2,5.6-7.8
                  C23.2,7.7,19.5,4,15,4z"/>
              </svg>
            </a>

            {/* Tasaka Games */}
            <a
              href="https://www.tasaka-games.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Tasaka Games"
            >
              <img src={socialMedia1} alt="Tasaka Games" className="social-img" />
            </a>

            {/* Mark Tasaka Portfolio */}
            <a
              href="https://marktasaka.ca/work"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Mark Tasaka Portfolio"
            >
              <img src={socialMedia2} alt="Mark Tasaka Portfolio" className="social-img" />
            </a>

          </div>
        </div>

        {/* ── Bottom Row: Nav centered below logo ── */}
        <nav className="header-nav" aria-label="Main navigation">
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
        </nav>

      </div>
    </header>
  );
};

export default Header;