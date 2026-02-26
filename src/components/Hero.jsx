import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCount1(99.8), 100);
    const timer2 = setTimeout(() => setCount2(500), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="ega-hero">
      <div className="ega-hero-grid"></div>
      <div className="ega-container">
        <div className="ega-hero-content">
          <div className="ega-hero-text">
            <h1 className="ega-hero-title">
              {content.hero.title}
            </h1>
            <p className="ega-hero-subtitle">
              {content.hero.subtitle}
            </p>
            <div className="ega-hero-stats">
              <div className="ega-stat-item">
                <span className="ega-stat-number">{count1}%</span>
                <span className="ega-stat-label">Porosité</span>
              </div>
              <div className="ega-stat-item">
                <span className="ega-stat-number">{count2}+</span>
                <span className="ega-stat-label">Projets</span>
              </div>
            </div>
            <div className="ega-hero-buttons">
              <button 
                onClick={() => scrollToSection('products')}
                className="ega-btn ega-btn-primary"
              >
                {content.hero.cta1}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="ega-btn ega-btn-secondary"
              >
                {content.hero.cta2}
              </button>
            </div>
          </div>
          <div className="ega-hero-image">
            <img 
              src="/product.png" 
              alt="Panneau EGAPURE"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="ega-hero-image-placeholder" style={{ display: 'none' }}>
              <div className="ega-placeholder-icon">🏗️</div>
              <p>Panneau EGAPURE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
