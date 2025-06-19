import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function Navbar() {
  /*
    Responsive Navbar for MoodVoyage.
    - React Router navigation via <Link> for Home, Trip Planner, Sign In
    - Collapses on mobile
    - Clicking Home routes to "/"
  */
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileToggle = () => setMobileOpen((open) => !open);
  const handleNavLinkClick = () => setMobileOpen(false);

  return (
    <nav className="navbar moodvoyage-navbar">
      <div className="container navbar-content">
        <Link className="moodvoyage-logo" to="/" aria-label="Home" onClick={handleNavLinkClick}>
          <span className="logo-symbol">✈</span>
          MoodVoyage
        </Link>
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
          <Link
            to="/"
            className="navbar-link"
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Home
          </Link>
          <Link
            to="/planner"
            className="navbar-link"
            style={{ color: 'var(--mv-primary)' }}
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Trip Planner
          </Link>
          <Link
            to="/sign-in"
            className="btn btn-auth"
            style={{ minWidth: 90, textDecoration: 'none', display: 'inline-block' }}
            onClick={handleNavLinkClick}
            tabIndex={mobileOpen ? 0 : undefined}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
