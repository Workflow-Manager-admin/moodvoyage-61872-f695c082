import React from 'react';
import './App.css';
import Navbar from './Navbar';

// PUBLIC_INTERFACE
function App() {
  /*
    Main Container for MoodVoyage:
      - Light theme with custom colors
      - Responsive navigation bar via Navbar component
      - Placeholder for authentication, trip planner, dynamic suggestions
      - Inviting homepage for micro-trip AI planner
  */
  return (
    <div className="app moodvoyage-theme">
      {/* Navigation Bar */}
      <Navbar />

      <main>
        <div className="container">
          {/* Homepage Hero Section */}
          <section className="hero moodvoyage-hero">
            <div className="subtitle">AI-Powered Micro-Trip Planner</div>
            <h1 className="title">Discover Your Ideal Weekend Getaway</h1>
            <div className="description">
              MoodVoyage helps you find the perfect trip for your mood, budget, and style. Let our AI inspire your next adventure!
            </div>
            <button className="btn btn-large btn-primary">Plan a Trip</button>
          </section>

          {/* Placeholders for Future Features */}
          <section className="future-sections-grid">
            <div className="future-section">
              <h3 className="future-section-title">🔒 Authentication Coming Soon</h3>
              <p className="future-section-desc">Secure sign-in & personalized experiences.</p>
            </div>
            <div className="future-section">
              <h3 className="future-section-title">🧭 Navigation Bar</h3>
              <p className="future-section-desc">Navigate easily between Home, Trip Planner, and Account.</p>
            </div>
            <div className="future-section">
              <h3 className="future-section-title">🤖 AI Suggestions</h3>
              <p className="future-section-desc">Let our AI suggest exciting trips based on your preferences.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Background design in light mode */}
      <div className="mv-background"></div>
    </div>
  );
}

export default App;