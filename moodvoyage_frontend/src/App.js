import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TripPlanner from './TripPlanner';
import './TripPlanner.css';

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

/*
  PUBLIC_INTERFACE
  Main Container for MoodVoyage:
    - Uses React Router for multipage navigation (Home, Trip Planner, Sign-In)
*/
function App() {
  return (
    <div className="app moodvoyage-theme">
      {/* Navigation Bar */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<TripPlanner />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </main>

      {/* Background design in light mode */}
      <div className="mv-background"></div>
    </div>
  );
}

export default App;