import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TripPlanner from './TripPlanner';
import './TripPlanner.css';
import SignIn from './SignIn';

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
          {/* Unify route naming: use `/signin` and update Navbar to match */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>

      {/* Background design in light mode */}
      <div className="mv-background"></div>
    </div>
  );
}

export default App;