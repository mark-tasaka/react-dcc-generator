// src/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo    from './img/header.png';
import linkedinIcon  from './img/linkedin.png';
import githubIcon    from './img/github.png';
import socialMedia1  from './img/social-media1.png';
import socialMedia2  from './img/social-media2.png';

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
              <img src={linkedinIcon} alt="LinkedIn" className="social-img" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/mark-tasaka"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <img src={githubIcon} alt="GitHub" className="social-img" />
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