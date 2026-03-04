// src/inc/Hero.js
import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

import slide1 from './img/hero/slide1.png';
import slide2 from './img/hero/slide2.png';
import slide3 from './img/hero/slide3.png';
import slide4 from './img/hero/slide4.png';
import slide5 from './img/hero/slide5.png';
import slide6 from './img/hero/slide6.png';

const SLIDES = [
  { src: slide1, alt: 'Goodman Games PDF Character Generators' },
  { src: slide2, alt: 'DCC Character Sheet – Slide 2' },
  { src: slide3, alt: 'DCC Character Sheet – Slide 3' },
  { src: slide4, alt: 'DCC Character Sheet – Slide 4' },
  { src: slide5, alt: 'DCC Character Sheet – Slide 5' },
  { src: slide6, alt: 'DCC Character Sheet – Slide 6' },
];

const SLIDE_INTERVAL_MS = 6000;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="hero" aria-label="Featured slideshow">

      {/* ── Slide Track ── */}
      <div className="hero-track">
        {SLIDES.map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className={`hero-slide${i === activeIndex ? ' hero-slide--active' : ''}`}
            draggable={false}
          />
        ))}
      </div>

      {/* ── Dot Navigation ── */}
      <div className="hero-dots" role="tablist" aria-label="Slideshow navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-dot${i === activeIndex ? ' hero-dot--active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;