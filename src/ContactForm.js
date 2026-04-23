import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Honeypot field — hidden from real users, bots fill it in automatically
  const [honeypot, setHoneypot] = useState('');

  // idle | submitting | success | error
  const [status, setStatus] = useState('idle');

  // ── Handlers ──────────────────────────────────────────
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — if filled, it's a bot; fake success so it doesn't retry
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/maqalpdj', {  // ← replace YOUR_FORM_ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // ── Success state ──────────────────────────────────────
  if (status === 'success') {
    return (
      <p className="contact-success">
        ✓ Thank you! Your message has been sent.
      </p>
    );
  }

  // ── Form ──────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form"
      noValidate
    >
      {/*
        ── Honeypot field ──────────────────────────────
        Visually hidden from real users via CSS (not display:none alone,
        which some bots detect). Bots auto-fill visible inputs.
      */}
      <input
        type="text"
        name="_honey"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="contact-honeypot"   /* hidden in CSS below */
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      {/* ── Name ── */}
      <div className="contact-field">
        <label htmlFor="cf-name" className="contact-label">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-input"
          placeholder="Your name"
        />
      </div>

      {/* ── Email ── */}
      <div className="contact-field">
        <label htmlFor="cf-email" className="contact-label">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
          placeholder="your@email.com"
        />
      </div>

      {/* ── Message ── */}
      <div className="contact-field">
        <label htmlFor="cf-message" className="contact-label">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="contact-textarea"
          placeholder="Your message..."
        />
      </div>

      {/* ── Error ── */}
      {status === 'error' && (
        <p className="contact-error">
          Something went wrong. Please try again.
        </p>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        className="contact-submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;