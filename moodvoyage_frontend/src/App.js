import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

// Simple placeholder Trip Planner page
function TripPlannerPage() {
  return (
    <div className="container">
      <section className="hero moodvoyage-hero">
        <div className="subtitle">Trip Planner</div>
        <h1 className="title">Start Planning Your Trip</h1>
        <div className="description">
          The trip planner page is under construction. Check back soon for full planning features!
        </div>
      </section>
    </div>
  );
}

// Simple placeholder Sign-In page
function SignInPage() {
  return (
    <div className="container">
      <section className="hero moodvoyage-hero">
        <div className="subtitle">Sign-In</div>
        <h1 className="title">Access Your Account</h1>
        <div className="description">
          Sign in form coming soon!
        </div>
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /*
    Main Container for MoodVoyage:
      - Uses React Router for multipage navigation (Home, Trip Planner, Sign-In)
  */
  return (
    <div className="app moodvoyage-theme">
      {/* Navigation Bar */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </main>

      {/* Background design in light mode */}
      <div className="mv-background"></div>
    </div>
  );
}

export default App;