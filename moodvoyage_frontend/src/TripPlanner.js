import React, { useState } from 'react';
import './App.css';

// Options for dropdowns (can be modified for future dynamic/AI population)
const MOODS = [
  { value: '', label: 'Select your mood' },
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'spontaneous', label: 'Spontaneous' }
];

const BUDGETS = [
  { value: '', label: 'Select budget' },
  { value: 'low', label: 'Low ($)' },
  { value: 'medium', label: 'Medium ($$)' },
  { value: 'high', label: 'High ($$$)' }
];

const LOCATIONS = [
  { value: '', label: 'Anywhere' },
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
  { value: 'city', label: 'City/Urban' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'surprise', label: 'Surprise Me!' }
];

// Helper: generate sample trips based on choices (placeholder for real AI integration)
function fakeAISuggestions({ mood, budget, location }) {
  let samples = [
    {
      title: 'Urban Foodie Adventure',
      desc: 'Explore trending cafes, food markets, and rooftop bars in your nearest city.',
      mood: 'adventurous',
      budget: 'medium',
      location: 'city'
    },
    {
      title: 'Quiet Beach Retreat',
      desc: 'Unwind at a boutique beachside inn and enjoy sunrise yoga.',
      mood: 'relaxed',
      budget: 'high',
      location: 'beach'
    },
    {
      title: 'Countryside Picnic',
      desc: 'Pack a basket and discover local farms for a spontaneous picnic among rolling hills.',
      mood: 'spontaneous',
      budget: 'low',
      location: 'countryside'
    },
    {
      title: 'Romantic Mountain Cabin',
      desc: 'Cozy up by the fire after hiking scenic trails. Perfect for couples!',
      mood: 'romantic',
      budget: 'medium',
      location: 'mountain'
    },
    {
      title: 'Cultural City Escape',
      desc: 'Museums, art walks, and live theater for an inspiring city break.',
      mood: 'cultural',
      budget: 'medium',
      location: 'city'
    }
  ];

  // Simple match filter. If "surprise", give any random item.
  if (location === 'surprise') return [samples[Math.floor(Math.random() * samples.length)]];
  let filtered = samples.filter(
    s =>
      (mood ? s.mood === mood : true) &&
      (budget ? s.budget === budget : true) &&
      (location && location !== '' ? s.location === location : true)
  );
  // Always at least one suggestion (fallback to sample list if none match)
  return filtered.length ? filtered : samples.slice(0, 1);
}

// PUBLIC_INTERFACE
function TripPlanner() {
  // Form data state
  const [form, setForm] = useState({
    mood: '',
    budget: '',
    location: '',
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // PUBLIC_INTERFACE
  // Simulate submitting to an AI suggestion backend.
  // In production, replace setTimeout/fakeAISuggestions with real API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setSuggestions([]);

    // Simulate async API (replace with API call in future)
    setTimeout(() => {
      // [INTEGRATION POINT] Swap fakeAISuggestions() with real API fetch.
      // Example: fetch('/api/ai-suggest', { ... })
      const result = fakeAISuggestions(form);
      setSuggestions(result);
      setLoading(false);
    }, 1250); // Simulated latency
  };

  // UI helpers — create MoodVoyage style spinners/messages
  const renderSuggestions = () => {
    if (!hasSearched) {
      return (
        <span style={{ color: 'var(--text-secondary)' }}>
          AI travel suggestions will appear here after you submit.
        </span>
      );
    }
    if (loading) {
      return (
        <span style={{ color: 'var(--mv-secondary)' }}>
          <span className="mv-spinner" style={{
            display: 'inline-block',
            border: '3px solid #e3eafd',
            borderTop: '3px solid var(--mv-primary)',
            borderRadius: '50%',
            width: 22,
            height: 22,
            verticalAlign: 'middle',
            marginRight: 11,
            animation: 'spin 1s linear infinite'
          }} />
          Generating your personalized trip ideas...
          <style>
            {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
          </style>
        </span>
      );
    }
    if (!loading && suggestions.length === 0) {
      return (
        <span style={{ color: 'var(--mv-accent)' }}>
          Sorry, no suggestions found for your preferences. Try adjusting your choices!
        </span>
      );
    }
    // Show trip suggestion cards
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        {suggestions.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(80,227,194,0.12)',
            borderRadius: 9,
            padding: '17px 15px',
            border: '1px solid var(--border-color)',
            color: 'var(--mv-primary)',
            boxShadow: '0 2px 10px 0 rgba(74,144,226,0.09)'
          }}>
            <div style={{ fontWeight: 700, fontSize: '1.08rem', color: 'var(--mv-secondary)', marginBottom: 3 }}>
              {s.title}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '1.04rem' }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <section className="planner-section moodvoyage-hero" style={{ marginTop: 110, maxWidth: 510, zIndex: 1 }}>
        <div className="subtitle" style={{ color: 'var(--mv-accent)' }}>Trip Planner</div>
        <h1 className="title" style={{ fontSize: '2.1rem' }}>Plan Your Perfect Escape</h1>
        <div className="description" style={{ marginBottom: 12 }}>
          Tell us your preferences and let MoodVoyage inspire your next getaway!
        </div>
        <form className="trip-form" onSubmit={handleSubmit} style={{ width: '100%', margin: '14px 0' }} autoComplete="off">
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
            style={{
              width: '100%',
              marginTop: 8,
              fontWeight: 600,
              letterSpacing: 0.01,
              background: 'linear-gradient(90deg, var(--mv-primary), var(--mv-accent))'
            }}
            disabled={loading}
          >
            {loading ? 'Working...' : 'Get Trip Suggestions'}
          </button>
        </form>
        {/* Dynamic AI Suggestions */}
        <div className="ai-suggestions" style={{
          background: 'rgba(74,144,226,0.05)',
          marginTop: 20,
          width: '100%',
          borderRadius: 8,
          minHeight: 75,
          display: 'flex',
          alignItems: hasSearched && !loading ? 'flex-start' : 'center',
          justifyContent: 'center',
          border: '1px solid var(--border-color)',
          color: 'var(--mv-primary)',
          fontWeight: 500,
          fontSize: '1.07rem',
          padding: hasSearched && !loading ? '17px 0' : '0'
        }}>
          {renderSuggestions()}
        </div>
        {/* Future: provide an area for backend errors if API fails */}
      </section>
    </div>
  );
}

export default TripPlanner;
