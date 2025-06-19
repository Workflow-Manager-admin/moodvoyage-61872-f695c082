import React, { useState } from 'react';
import './App.css';

/*
  TripPlanner: Collects mood, budget, and location preferences with branding.
  - Responsive, light theme, MoodVoyage palette.
  - Placeholder for AI-generated trip suggestions.
*/

// Options (could be replaced by dynamic content/AI in the future)
const MOODS = [
  { value: '', label: 'Select your mood' },
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'spontaneous', label: 'Spontaneous' },
];

const BUDGETS = [
  { value: '', label: 'Select budget' },
  { value: 'low', label: 'Low ($)' },
  { value: 'medium', label: 'Medium ($$)' },
  { value: 'high', label: 'High ($$$)' },
];

const LOCATIONS = [
  { value: '', label: 'Anywhere' },
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
  { value: 'city', label: 'City/Urban' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'surprise', label: 'Surprise Me!' }
];

// PUBLIC_INTERFACE
function TripPlanner() {
  const [form, setForm] = useState({
    mood: '',
    budget: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Placeholder: Fake submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Future: Call AI suggestion API here
  };

  return (
    <div className="container">
      <section className="planner-section moodvoyage-hero" style={{marginTop: 110, maxWidth: 510}}>
        <div className="subtitle" style={{ color: 'var(--mv-accent)' }}>Trip Planner</div>
        <h1 className="title" style={{ fontSize: '2.1rem' }}>Plan Your Perfect Escape</h1>
        <div className="description" style={{ marginBottom: 12 }}>
          Tell us your preferences and let MoodVoyage inspire your next getaway!
        </div>
        <form className="trip-form" onSubmit={handleSubmit} style={{width: '100%', margin: '14px 0'}}>
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label htmlFor="mood" className="planner-label">Mood</label>
            <select
              id="mood"
              name="mood"
              value={form.mood}
              onChange={handleChange}
              className="planner-input"
              required
              aria-label="Select your mood"
            >
              {MOODS.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label htmlFor="budget" className="planner-label">Budget</label>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="planner-input"
              required
              aria-label="Select your budget"
            >
              {BUDGETS.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label htmlFor="location" className="planner-label">Location</label>
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="planner-input"
              required
              aria-label="Select your location preference"
            >
              {LOCATIONS.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-large btn-primary"
            style={{ width: '100%', marginTop: 8, fontWeight: 600, letterSpacing: 0.01, background: 'linear-gradient(90deg, var(--mv-primary), var(--mv-accent))' }}
          >
            Get Trip Suggestions
          </button>
        </form>
        {/* AI Suggestions Placeholder */}
        <div className="ai-suggestions" style={{
          background: 'rgba(74,144,226,0.05)',
          marginTop: 20,
          width: '100%',
          borderRadius: 8,
          minHeight: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border-color)',
          color: 'var(--mv-primary)',
          fontWeight: 500,
          fontSize: '1.07rem',
        }}>
          {!submitted &&
              <span style={{ color: 'var(--text-secondary)'}}>AI travel suggestions will appear here after you submit.</span>
          }
          {submitted &&
              <span>✨ Your personalized AI-powered trip recommendations will be shown here soon!</span>
          }
        </div>
      </section>
    </div>
  );
}

export default TripPlanner;
