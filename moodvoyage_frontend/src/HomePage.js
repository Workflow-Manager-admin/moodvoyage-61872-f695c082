import React from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function HomePage() {
  /*
    Homepage hero and future-sections as a standalone routed page.
  */
  const navigate = useNavigate();

  const handlePlanTripClick = () => {
    // Navigate to the /planner page using React Router
    navigate('/planner');
  };

  return (
    <div className="container">
      {/* Homepage Hero Section */}
      <section className="hero moodvoyage-hero">
        <div className="subtitle">AI-Powered Micro-Trip Planner</div>
        <h1 className="title">Discover Your Ideal Weekend Getaway</h1>
        <div className="description">
          MoodVoyage helps you find the perfect trip for your mood, budget, and style. Let our AI inspire your next adventure!
        </div>
        <button className="btn btn-large btn-primary" onClick={handlePlanTripClick}>
          Plan a Trip
        </button>
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
  );
}

export default HomePage;
