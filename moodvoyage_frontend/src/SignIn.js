import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * SignIn component: renders a sign-in form with email and password.
 * Validates input and shows error messages if invalid.
 */
function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Simple validation rules
  function validate(values) {
    const errs = {};
    if (!values.email) {
      errs.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!values.password) {
      errs.password = 'Password is required';
    } else if (values.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      // Will be replaced with actual authentication logic if needed
      alert('Sign in successful! (Demo)');
    }
  }

  // For accessibility: show error after field blur or submit
  const showError = (field) =>
    ((touched[field] || submitted) && errors[field]) ? (
      <span
        style={{
          color: 'var(--mv-accent)',
          fontSize: '0.99rem',
          marginTop: 2,
          display: 'block',
        }}
        role="alert"
        aria-live="polite"
      >
        {errors[field]}
      </span>
    ) : null;

  return (
    <div className="container">
      <section
        className="moodvoyage-hero"
        style={{ marginTop: 110, maxWidth: 440, zIndex: 1 }}
      >
        <div className="subtitle" style={{ color: 'var(--mv-accent)' }}>
          Sign In
        </div>
        <h1 className="title" style={{ fontSize: '2.1rem' }}>
          Access Your MoodVoyage Account
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 17,
            margin: '16px 0 0 0',
            width: '100%',
          }}
          autoComplete="off"
          aria-label="Sign In Form"
        >
          <div className="form-group" style={{ alignItems: 'flex-start', width: '100%' }}>
            <label htmlFor="email" className="planner-label">
              Email
            </label>
            <input
              type="email"
              className="planner-input"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@email.com"
              autoComplete="username"
              style={{ width: '100%' }}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {showError('email')}
          </div>
          <div className="form-group" style={{ alignItems: 'flex-start', width: '100%' }}>
            <label htmlFor="password" className="planner-label">
              Password
            </label>
            <input
              type="password"
              className="planner-input"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              autoComplete="current-password"
              style={{ width: '100%' }}
              required
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {showError('password')}
          </div>
          <button
            type="submit"
            className="btn btn-large btn-auth"
            style={{ width: '100%', fontWeight: 600, background: 'linear-gradient(90deg, var(--mv-primary), var(--mv-accent))' }}
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
