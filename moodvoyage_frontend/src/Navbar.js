import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Navbar() {
  /*
    Responsive Navbar for MoodVoyage.
    - Uses theme colors: primary (#4A90E2), secondary (#50E3C2), accent (#F5A623)
    - Links: Home, Trip Planner, Sign In (using placeholder buttons/anchors)
    - Collapses on mobile
  */
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileToggle = () => setMobileOpen((open) => !open);
  const handleNavLinkClick = () => setMobileOpen(false);

  return (
    <nav className="navbar moodvoyage-navbar">
      <div className="container navbar-content">
        <a className="moodvoyage-logo" href="/" aria-label="Home">
          <span className="logo-symbol">✈</span>
          MoodVoyage
        </a>
        {/* Hamburger icon for mobile */}
        <button
          className="navbar-hamburger"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={handleMobileToggle}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
        <div
          className={
            'navbar-actions' +
            (mobileOpen ? ' navbar-actions-mobile-open' : '')
          }
        >
          <a
            href="/"
            className="navbar-link"
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Home
          </a>
          <a
            href="#"
            className="navbar-link"
            style={{ color: 'var(--mv-primary)' }}
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Trip Planner
          </a>
          <button
            className="btn btn-auth"
            style={{ minWidth: 90 }}
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
