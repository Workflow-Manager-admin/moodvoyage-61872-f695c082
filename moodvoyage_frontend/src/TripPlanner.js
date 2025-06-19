import React, { useState } from 'react';
import './App.css';

/*
  Expanded set of moods for creative trip planning.
  This aligns with the MoodVoyage goal: more relevant, fun, and personalized choices!
*/
const MOODS = [
  { value: '', label: 'Select your mood' },
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'nature', label: 'Nature Connection' },
  { value: 'festive', label: 'Festive' },
  { value: 'spontaneous', label: 'Spontaneous' },
  { value: 'creative', label: 'Creative' },
  { value: 'family', label: 'Family Fun' },
  { value: 'solo', label: 'Solo Recharge' },
  { value: 'foodie', label: 'Foodie' }
];

const BUDGETS = [
  { value: '', label: 'Select budget' },
  { value: 'low', label: 'Low (₹)' },
  { value: 'medium', label: 'Medium (₹₹)' },
  { value: 'high', label: 'High (₹₹₹)' }
];

// Distance buckets in kilometers
const DISTANCES = [
  { value: '', label: 'Select distance' },
  { value: '50', label: 'Within 50 km (Local)' },
  { value: '150', label: 'Within 150 km (Short drive/train)' },
  { value: '400', label: 'Within 400 km (Long weekend trip)' },
  { value: '1000', label: 'Up to 1000 km (Across region)' },
  { value: '3000', label: '3000+ km (Anywhere in India)' }
];

// Helper to assign "distance" attribute (km) to samples depending on location
function getSampleDistance(loc) {
  switch (loc) {
    case 'mumbai':
    case 'bangalore':
    case 'delhi':
      return 0;
    case 'goa':
      return 400;
    case 'rishikesh':
    case 'ooty':
      return 350;
    case 'jaipur':
    case 'darjeeling':
      return 1500;
    case 'kerala':
    case 'ladakh':
    case 'varanasi':
      return 2000;
    case 'rann':
      return 900;
    case 'wilderness':
      return 500;
    case 'beach':
      return 250;
    case 'mountain':
      return 300;
    case 'festival':
      return 200;
    case 'heritage':
      return 350;
    case 'countryside':
      return 250;
    case 'surprise':
      return 0; // Special bucket for "surprise", ignores distance
    case 'city':
      return 0;
    default:
      return 2000;
  }
}

/*
  PUBLIC_INTERFACE
  Trip suggestion logic using mood, budget, and travelDistance for relevant hints!
*/
function fakeAISuggestions({ mood, budget, travelDistance }) {
  // If user is "spontaneous", skip all filters and show a surprise!
  const samples = [
    {
      title: 'Urban Foodie Adventure, Mumbai',
      desc: 'Discover street food, trendy cafes, Old Town market walks, and night bazaars. Typical cost: ₹4,000–₹8,000.',
      mood: 'foodie',
      budget: 'medium',
      location: 'mumbai'
    },
    {
      title: 'Yoga & Wellness Retreat, Rishikesh',
      desc: 'Enjoy riverbank yoga, meditation, nature hikes, and healthy cuisine. Packages: ₹5,000–₹9,000.',
      mood: 'wellness',
      budget: 'medium',
      location: 'rishikesh'
    },
    {
      title: 'Romantic Houseboat Stay, Kerala Backwaters',
      desc: 'Sail on a private houseboat with sunset dinners and lush views. From: ₹11,000+ per couple.',
      mood: 'romantic',
      budget: 'high',
      location: 'kerala'
    },
    {
      title: 'Mountain Trek & Starry Skies, Ladakh',
      desc: 'Conquer high passes, spend nights stargazing, and campfires with friends. Cost: ₹7,000–₹12,000.',
      mood: 'adventurous',
      budget: 'medium',
      location: 'ladakh'
    },
    {
      title: 'Heritage Jaipur Festival',
      desc: 'Immerse in Jaipur’s palaces, local crafts, and dazzling festivals. Expect: ₹6,000–₹10,000.',
      mood: 'festive',
      budget: 'medium',
      location: 'jaipur'
    },
    {
      title: 'Serene Tea Gardens, Darjeeling',
      desc: 'Stay at a heritage plantation, enjoy tea tastings and sunrise on the hills. From: ₹4,000–₹7,000.',
      mood: 'nature',
      budget: 'medium',
      location: 'darjeeling'
    },
    {
      title: 'Wildlife Safari, Ranthambore',
      desc: 'Go on a jungle safari, spot tigers and unwind in eco-lodges. Around ₹7,500–₹13,000.',
      mood: 'nature',
      budget: 'high',
      location: 'wilderness'
    },
    {
      title: 'Creative Photography Walk, Bangalore',
      desc: 'Street art, city markets, and architectural hidden gems guided tour. Avg: ₹2,000–₹4,000.',
      mood: 'creative',
      budget: 'low',
      location: 'bangalore'
    },
    {
      title: 'Festive Lights in Delhi',
      desc: 'Experience festivals, food carnivals, and city lights with buzzing energy. Plan for ₹3,500–₹7,000.',
      mood: 'festive',
      budget: 'medium',
      location: 'delhi'
    },
    {
      title: 'Peaceful Lakeside Ooty',
      desc: 'Wake up to misty mornings, go boating and stroll botanical gardens. From ₹5,000–₹10,000.',
      mood: 'relaxed',
      budget: 'medium',
      location: 'ooty'
    },
    {
      title: 'Spontaneous Road Trip – The Open Road',
      desc: 'Decide each stop as you go: flip a coin for left or right! Budget: ₹2,000–₹5,000.',
      mood: 'spontaneous',
      budget: 'low',
      location: 'surprise'
    },
    {
      title: 'Artisan Village Tour, Countryside',
      desc: 'Discover local crafts, pottery lessons, and tradition. Under ₹2,500.',
      mood: 'cultural',
      budget: 'low',
      location: 'countryside'
    },
    {
      title: 'Luxury Spa Getaway, Goa',
      desc: 'Pamper yourself with ocean-view massages and gourmet meals. Expect: ₹13,000+.',
      mood: 'wellness',
      budget: 'high',
      location: 'goa'
    },
    {
      title: 'Family Safari Adventure — Rann of Kutch',
      desc: 'Salt flats jeep rides, flamingo festivals, camel treks. Fun for all ages! From ₹9,000.',
      mood: 'family',
      budget: 'medium',
      location: 'rann'
    },
    {
      title: 'River Rafting Pulse, Rishikesh',
      desc: 'Adrenaline-pumping rafting, cliff diving, and riverside camping. Cost: ₹3,000–₹6,000.',
      mood: 'adventurous',
      budget: 'low',
      location: 'rishikesh'
    },
    {
      title: 'Wellness Spa – Any Mountain Retreat',
      desc: 'Therapeutic massages, hikes, and digital detox with towering views. Around ₹7,000–₹11,000.',
      mood: 'wellness',
      budget: 'medium',
      location: 'mountain'
    },
    {
      title: 'City Shopping Spree, Delhi',
      desc: 'Haute couture, street bazaars, and gourmet food stops. Budget: ₹5,000–₹12,000.',
      mood: 'creative',
      budget: 'medium',
      location: 'delhi'
    },
    {
      title: 'Solo Artist Retreat, Ooty',
      desc: 'Private cabin, painting workshop, forest walks. Reconnect solo! ₹8,000–₹13,000.',
      mood: 'solo',
      budget: 'medium',
      location: 'ooty'
    },
    {
      title: 'Night Beach Carnival, Goa',
      desc: 'Dance, music, fun games for all at the festive shore. From ₹6,000+.',
      mood: 'festive',
      budget: 'medium',
      location: 'beach'
    },
    {
      title: 'Sunset Beach Dinner',
      desc: 'Enjoy a private sunset dinner with music and laughter right by the waves. From ₹5,000 upwards.',
      mood: 'romantic',
      budget: 'medium',
      location: 'beach'
    },
    // Some generic 'Any...' style fallback options
    {
      title: 'Surprise Adventure!',
      desc: 'Pack your bags for a mystery weekend – destination revealed by dice roll! Budget: flexible, often under ₹3,000.',
      mood: 'spontaneous',
      budget: 'low',
      location: 'surprise'
    },
    {
      title: 'City Cultural Trail',
      desc: 'Museums, galleries, and hidden music venues for inspiring weekends. ₹3,000–₹7,000.',
      mood: 'cultural',
      budget: 'medium',
      location: 'city'
    },
    {
      title: 'Mountain Trekking Challenge',
      desc: 'Test your limits on a guided mountain trek. Group discounts! Budget: ₹4,000–₹8,000.',
      mood: 'adventurous',
      budget: 'medium',
      location: 'mountain'
    },
    {
      title: 'Luxury Countryside Escape',
      desc: 'Stay in a heritage villa with foot trails and gourmet food. From ₹12,000+.',
      mood: 'relaxed',
      budget: 'high',
      location: 'countryside'
    }
  ];

  // Give every sample an effectiveDistance (km)
  const samplesWithDist = samples.map(s => ({
    ...s,
    km: getSampleDistance(s.location)
  }));

  // Shuffle helper
  function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }

  // If "spontaneous", just random
  if (mood === 'spontaneous') {
    return shuffle(samplesWithDist).slice(0, 3);
  }

  // Parse travelDistance as int
  const maxDistance = travelDistance ? parseInt(travelDistance, 10) : null;

  // Main, strict filter: mood, budget, distance must be satisfied
  let filtered = samplesWithDist.filter(s =>
    (mood ? s.mood === mood : true) &&
    (budget ? s.budget === budget : true) &&
    (
      maxDistance
        ? (s.km === 0 || s.km <= maxDistance) // 0 = local/city
        : true
    )
  );

  // Add broader matches if too few
  if (filtered.length < 3) {
    // Relax distance (still require mood + budget)
    filtered = filtered.concat(
      shuffle(samplesWithDist.filter(s =>
        (mood ? s.mood === mood : true) &&
        (budget ? s.budget === budget : true) &&
        (maxDistance ? s.km > maxDistance : false)
      )).slice(0, 3 - filtered.length)
    );
  }
  if (filtered.length < 3) {
    // Relax mood, just any in budget and distance
    filtered = filtered.concat(
      shuffle(samplesWithDist.filter(s =>
        (budget ? s.budget === budget : true) &&
        (maxDistance ? (s.km === 0 || s.km <= maxDistance) : true)
      )).slice(0, 3 - filtered.length)
    );
  }

  return shuffle(filtered).slice(0, 3);
}

// PUBLIC_INTERFACE
function TripPlanner() {
  // State for user form data, now with travelDistance instead of location
  const [form, setForm] = useState({
    mood: '',
    budget: '',
    travelDistance: '',
  });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // PUBLIC_INTERFACE
  // Simulated async request; replace with API for real AI.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setSuggestions([]);

    setTimeout(() => {
      const result = fakeAISuggestions(form);
      setSuggestions(result);
      setLoading(false);
    }, 1250);
  };

  // UI – Suggestions rendering with MoodVoyage visual style
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
            <label htmlFor="travelDistance" className="planner-label">
              Travel Distance
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: "0.97em", marginLeft: 7 }}>
                (one-way, approx.)
              </span>
            </label>
            <select
              id="travelDistance"
              name="travelDistance"
              value={form.travelDistance}
              onChange={handleChange}
              className="planner-input"
              required
              aria-label="Select travel distance"
              disabled={loading}
            >
              {DISTANCES.map(opt => (
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
      </section>
    </div>
  );
}

export default TripPlanner;
