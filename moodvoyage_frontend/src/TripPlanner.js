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

/* PUBLIC_INTERFACE
  Defines distance options per trip duration (in kilometers).
  Now includes 1-day & 4-day, in addition to 2/3-day options.
*/
const DURATION_OPTIONS = [
  { value: '', label: 'Select trip duration' },
  { value: '1', label: '1-day (Day Trip)' },
  { value: '2', label: '2-day Weekend' },
  { value: '3', label: '3-day Weekend' },
  { value: '4', label: '4-day Short Escape' }
];
const DISTANCES_BY_DURATION = {
  "1": [
    { value: '', label: 'Select distance' },
    { value: '20', label: 'Within 20 km (In-city/Lunch outing)' },
    { value: '50', label: 'Within 50 km (Very local)' },
    { value: '120', label: 'Within 120 km (Up to 2hr drive/train)' }
    // For 1-day, max ~120km typically.
  ],
  "2": [
    { value: '', label: 'Select distance' },
    { value: '50', label: 'Within 50 km (Very local)' },
    { value: '150', label: 'Within 150 km (Same city or quick drive)' },
    { value: '400', label: 'Within 400 km (One overnight possible)' }
    // Max realistic for 2-day: 400km approx
  ],
  "3": [
    { value: '', label: 'Select distance' },
    { value: '50', label: 'Within 50 km (Very local)' },
    { value: '150', label: 'Within 150 km (Short drive/train)' },
    { value: '400', label: 'Within 400 km (Long weekend trip)' },
    { value: '1000', label: 'Up to 1000 km (Across region)' },
    { value: '3000', label: '3000+ km (Anywhere in India)' }
    // For 3-day, longer trips fit better
  ],
  "4": [
    { value: '', label: 'Select distance' },
    { value: '150', label: 'Within 150 km (Regional/relaxed roadtrip)' },
    { value: '400', label: 'Within 400 km (Classic short trip)' },
    { value: '1000', label: 'Up to 1000 km (Broader region)' },
    { value: '2500', label: 'Up to 2500 km (Cross-country possible)' },
    { value: '3000', label: '3000+ km (Pan India)' }
    // Up to 2500-3000km can work for 4d
  ]
};

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
/*
  PUBLIC_INTERFACE
  Enhanced suggestion logic matching both trip duration and travel distance.
  Duration and distance together ensure plausible options for real weekend getaways.
*/
function fakeAISuggestions({ mood, budget, travelDistance, tripDuration }) {
  /**
   * Expanded trip suggestion dataset.
   * Each entry contains: title, desc, mood, budget, location, duration (days, array), and min/max rupees estimate.
   * "Budget" is categorized: low ~<5k, medium ~5k-10k, high >10k.
   * The entries are realistic for the intended Indian context and closely mapped to duration and budget constraints.
   */
  const samples = [
    // ADVENTUROUS
    {
      title: 'Half-Day Trek at Sanjay Gandhi National Park, Mumbai',
      desc: 'Short morning trek, breakfast picnic, and Kanheri caves exploration. Day-trip: ₹800–₹2,500.',
      mood: 'adventurous',
      budget: 'low',
      location: 'mumbai',
      duration: [1]
    },
    {
      title: 'River Rafting & Cliff-Jumping, Rishikesh',
      desc: 'Thrilling one-day river rafting, cliff-diving and riverside lunch. From ₹2,000.',
      mood: 'adventurous',
      budget: 'low',
      location: 'rishikesh',
      duration: [1, 2]
    },
    {
      title: 'Weekend Mountain Trek, Sahyadris',
      desc: 'Guided night trek, sunrise view, mountain meals, and camping. ₹2,500–₹5,000.',
      mood: 'adventurous',
      budget: 'low',
      location: 'mountain',
      duration: [2]
    },
    {
      title: 'Desert Safari & Jeep Ride, Jaipur',
      desc: '2-day adventure with jeep rides, desert camp stay, and folk shows. ₹5,500–₹8,500.',
      mood: 'adventurous',
      budget: 'medium',
      location: 'jaipur',
      duration: [2]
    },
    {
      title: 'Explore Leh, Ladakh Expeditions',
      desc: 'Three days trekking, monastery visits, stargazing. Includes local homestays. ₹8,500–₹15,000.',
      mood: 'adventurous',
      budget: 'medium',
      location: 'ladakh',
      duration: [3,4]
    },
    // RELAXED
    {
      title: 'Botanical Walk & Spa Retreat, Bangalore',
      desc: 'Lalbagh visit, brunch, and afternoon at city spa. Great for a single day off! ₹1,500–₹3,500.',
      mood: 'relaxed',
      budget: 'low',
      location: 'bangalore',
      duration: [1]
    },
    {
      title: 'Lakeside Stay, Ooty',
      desc: 'Wake up to cool breeze, enjoy local pasties, boat ride, botanical gardens. ₹4,000–₹7,000.',
      mood: 'relaxed',
      budget: 'medium',
      location: 'ooty',
      duration: [2,3]
    },
    {
      title: 'Luxury Countryside Villa Escape',
      desc: '4-day stay at a heritage villa: lazy walks, foot trails, chef-prepared meal. From ₹18,000.',
      mood: 'relaxed',
      budget: 'high',
      location: 'countryside',
      duration: [4]
    },
    // ROMANTIC
    {
      title: 'Chic Brunch & Art Walk, Mumbai',
      desc: 'Start with a scenic coastal brunch, then stroll through Kala Ghoda galleries. Under ₹3,000.',
      mood: 'romantic',
      budget: 'low',
      location: 'mumbai',
      duration: [1]
    },
    {
      title: 'Beachside Candlelight Dinner, Goa',
      desc: 'Romantic 2-day getaway, sunset dining, and relaxing at the shore. ₹7,000–₹14,000.',
      mood: 'romantic',
      budget: 'medium',
      location: 'goa',
      duration: [2]
    },
    {
      title: 'Private Houseboat, Kerala Backwaters',
      desc: 'Glide down palm-fringed canals, enjoy dinner onboard, 2-3 night romance. ₹12,000–₹20,000.',
      mood: 'romantic',
      budget: 'high',
      location: 'kerala',
      duration: [3,4]
    },
    // CULTURAL
    {
      title: 'Old City Heritage Walk, Delhi',
      desc: 'Food walking tour: Chandni Chowk, heritage havelis, local bazaars. Day-trip: ₹1200–₹3,500.',
      mood: 'cultural',
      budget: 'low',
      location: 'delhi',
      duration: [1]
    },
    {
      title: 'Artisan Village Explorations',
      desc: 'Pottery, weaving, and musical experience in nearby village clusters. ₹2,500–₹4,000.',
      mood: 'cultural',
      budget: 'low',
      location: 'countryside',
      duration: [1,2]
    },
    {
      title: 'Festivals, Palaces & Bazaars, Jaipur',
      desc: 'Immerse yourself in local crafts, ornate palaces, and light festivals. ₹6,000–₹10,000.',
      mood: 'cultural',
      budget: 'medium',
      location: 'jaipur',
      duration: [2,3]
    },
    // WELLNESS
    {
      title: 'Yoga Breakfast in the Park, Bangalore',
      desc: 'Morning yoga session and healthy vegan brunch. ₹900–₹1,800.',
      mood: 'wellness',
      budget: 'low',
      location: 'bangalore',
      duration: [1]
    },
    {
      title: 'Himalayan Meditation Retreat, Rishikesh',
      desc: '2-3 day ashram stay, meditation and riverside peace. ₹4,000–₹8,000.',
      mood: 'wellness',
      budget: 'medium',
      location: 'rishikesh',
      duration: [2,3]
    },
    {
      title: 'Luxury Spa Getaway, Goa',
      desc: 'Four days of massages, yoga, and oceanfront relaxation. ₹15,000+.',
      mood: 'wellness',
      budget: 'high',
      location: 'goa',
      duration: [4]
    },
    // FAMILY
    {
      title: 'Science Museum & Zoo, Bangalore',
      desc: 'Kid-friendly day at the science center and animal feeding at the zoo. ₹800–₹2,500.',
      mood: 'family',
      budget: 'low',
      location: 'bangalore',
      duration: [1]
    },
    {
      title: 'Safari & Craftwork, Rann of Kutch',
      desc: 'Jeep rides with salt-flat fun and souvenir making. ₹6,000–₹10,000.',
      mood: 'family',
      budget: 'medium',
      location: 'rann',
      duration: [2,3]
    },
    {
      title: 'Week at Wonderland, Delhi & Agra',
      desc: 'Visit theme parks, Taj Mahal & family resorts on a 4-day outing. ₹14,000–₹28,000.',
      mood: 'family',
      budget: 'high',
      location: 'delhi',
      duration: [4]
    },
    // FOODIE
    {
      title: 'Breakfast Crawl, Street Eats of Mumbai',
      desc: 'Pav bhaji, vada pav, Irani cafes – morning food crawl for your inner foodie. ₹800–₹2,000.',
      mood: 'foodie',
      budget: 'low',
      location: 'mumbai',
      duration: [1]
    },
    {
      title: 'South Indian Food Roadtrip, Chennai to Pondicherry',
      desc: 'A 2-day culinary drive: filter coffee, dosas, French cafes. ₹5,000–₹8,000.',
      mood: 'foodie',
      budget: 'medium',
      location: 'pondicherry',
      duration: [2]
    },
    {
      title: 'Gourmet Weekend in Goa',
      desc: 'Modern Goan cuisine adventure, 4-day fine dining, and chef events. ₹20,000+.',
      mood: 'foodie',
      budget: 'high',
      location: 'goa',
      duration: [4]
    },
    // SPONTANEOUS
    {
      title: 'Flip-a-Coin City Adventure',
      desc: 'Arrive at your nearest train station, board any local going anywhere! Budget: ₹1,500–₹3,000.',
      mood: 'spontaneous',
      budget: 'low',
      location: 'surprise',
      duration: [1,2]
    },
    {
      title: 'Mystery Group Getaway',
      desc: 'Book a secret cabin/weekend stay—destination revealed last minute! ₹5,000–₹8,000.',
      mood: 'spontaneous',
      budget: 'medium',
      location: 'surprise',
      duration: [2,3]
    },
    {
      title: 'Random Flight Finder',
      desc: 'Go to airport, buy the cheapest ticket on the spot, and let the adventure begin. 4 days. ₹12,000+.',
      mood: 'spontaneous',
      budget: 'high',
      location: 'surprise',
      duration: [4]
    },
    // FESTIVE
    {
      title: 'Local Fair Day, Any Major City',
      desc: 'Color, food stalls, music, and traditional contests. ₹1,000–₹2,500.',
      mood: 'festive',
      budget: 'low',
      location: 'city',
      duration: [1]
    },
    {
      title: 'Diwali in Jaipur',
      desc: 'Experience palace light-ups with festive food and fireworks. Two nights, ₹7,000–₹13,000.',
      mood: 'festive',
      budget: 'medium',
      location: 'jaipur',
      duration: [2,3]
    },
    // SOLO
    {
      title: 'Solo Meditation Day in Nature',
      desc: 'Short escape to a nature park on your own. Journal by the pond. ~₹1,500.',
      mood: 'solo',
      budget: 'low',
      location: 'mountain',
      duration: [1]
    },
    {
      title: 'Creative Solo Retreat, Ooty Cabin',
      desc: 'Stay in a quiet hill cabin with art supplies and long nature walks. 2–3 days. ₹6,000–₹12,000.',
      mood: 'solo',
      budget: 'medium',
      location: 'ooty',
      duration: [2,3]
    },
    // CREATIVE
    {
      title: 'Street Art, Poetry & Coffee Trail',
      desc: 'Spend the day uncovering murals, writer’s café, and poetry readings. ₹1,000–₹2,300.',
      mood: 'creative',
      budget: 'low',
      location: 'delhi',
      duration: [1]
    },
    {
      title: 'Digital Detox Author Camp',
      desc: 'Three quiet days in a mountain retreat—reading, writing, idea jams. ₹5,500–₹9,000.',
      mood: 'creative',
      budget: 'medium',
      location: 'mountain',
      duration: [3]
    },
    // NATURE
    {
      title: 'Early Morning Birdwatching, Local Wetlands',
      desc: 'Nature walk, binoculars, and local chai. Daytrip, ₹800–₹1,500.',
      mood: 'nature',
      budget: 'low',
      location: 'countryside',
      duration: [1]
    },
    {
      title: 'Tea Estate Stay in Darjeeling',
      desc: 'Wander through tea gardens, mountain views, and local cuisine. 2–3 days, ₹5,000–₹9,000.',
      mood: 'nature',
      budget: 'medium',
      location: 'darjeeling',
      duration: [2,3]
    }
  ];

  // (Assign .km as before for distance check)
  const samplesWithDist = samples.map(s => ({
    ...s,
    km: getSampleDistance(s.location)
  }));

  function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }

  // Parse tripDuration as integer, match entries with that duration if specified
  const duration = tripDuration ? parseInt(tripDuration, 10) : null;
  const maxDistance = travelDistance ? parseInt(travelDistance, 10) : null;

  // Helper: whether the sample matches the intended trip day count
  function matchesDuration(sample) {
    if (!duration) return true;
    // If sample.duration not present, consider it for fallback only
    if (!sample.duration) return true;
    return sample.duration.some(d => d === duration);
  }

  function isPossibleForDuration(sample) {
    if (!duration) return true;
    if (duration === 1) return sample.km === 0 || sample.km <= 120;
    if (duration === 2) return sample.km === 0 || sample.km <= 400;
    if (duration === 3) return sample.km === 0 || sample.km <= 2000;
    if (duration === 4) return sample.km === 0 || sample.km <= 3000;
    return true;
  }

  // SPONTANEOUS mood: random & ignore constraints
  if (mood === 'spontaneous') {
    return shuffle(samplesWithDist.filter(matchesDuration)).slice(0, 3);
  }

  // Find samples matching all filters strictly (mood, budget, duration, distance range)
  let filtered = samplesWithDist.filter(
    s =>
      (mood ? s.mood === mood : true) &&
      (budget ? s.budget === budget : true) &&
      matchesDuration(s) &&
      isPossibleForDuration(s) &&
      (maxDistance
        ? (s.km === 0 || s.km <= maxDistance)
        : true)
  );

  // If not enough, relax: allow entries that fit mood, budget, matchesDuration (may slightly overshoot distance)
  if (filtered.length < 3) {
    filtered = filtered.concat(
      shuffle(
        samplesWithDist.filter(
          s =>
            (mood ? s.mood === mood : true) &&
            (budget ? s.budget === budget : true) &&
            matchesDuration(s) &&
            (maxDistance ? s.km > maxDistance : false)
        )
      ).slice(0, 3 - filtered.length)
    );
  }
  // If still too few, allow only mood+budget
  if (filtered.length < 3) {
    filtered = filtered.concat(
      shuffle(
        samplesWithDist.filter(
          s =>
            (budget ? s.budget === budget : true) &&
            (mood ? s.mood === mood : true)
        )
      ).slice(0, 3 - filtered.length)
    );
  }

  return shuffle(filtered).slice(0, 3);
}

/*
  PUBLIC_INTERFACE
  TripPlanner component with support for weekend duration (2 or 3 days).
*/
function TripPlanner() {
  // State for form data (now with more flexible durations)
  const [form, setForm] = useState({
    tripDuration: '', // "1", "2", "3", "4"
    mood: '',
    budget: '',
    travelDistance: '',
  });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Update trip planner form, clearing downstreams if duration changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If tripDuration is changed, reset travelDistance as well
    setForm((prev) => {
      if (name === "tripDuration") {
        return { ...prev, tripDuration: value, travelDistance: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  // PUBLIC_INTERFACE
  // Simulated async request; replace with API for real AI.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setSuggestions([]);

    setTimeout(() => {
      // Spread form (including tripDuration) to fakeAISuggestions
      const result = fakeAISuggestions({ ...form });
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
        <form
          className="trip-form"
          onSubmit={handleSubmit}
          style={{ width: '100%', margin: '14px 0' }}
          autoComplete="off"
        >
          {/* Trip Duration Selector */}
          <div className="form-group" style={{ marginBottom: 14 }}>
            <label htmlFor="tripDuration" className="planner-label">Trip Duration</label>
            <select
              id="tripDuration"
              name="tripDuration"
              value={form.tripDuration}
              onChange={handleChange}
              className="planner-input"
              required
              aria-label="Select trip duration"
              disabled={loading}
            >
              {DURATION_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {/* Mood */}
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
          {/* Budget */}
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
          {/* Travel Distance Options Contextual to Duration */}
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
              disabled={loading || !form.tripDuration}
            >
              {/* Default if duration not selected */}
              {!form.tripDuration
                ? <option value="">Choose trip duration first</option>
                : (DISTANCES_BY_DURATION[form.tripDuration] || []).map(opt =>
                  <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                    {opt.label}
                  </option>
                )
              }
            </select>
          </div>
          {/* Submit Button */}
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
        <div
          className="ai-suggestions"
          style={{
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
