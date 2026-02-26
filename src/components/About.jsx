import React from 'react';
import { useContent } from '../context/ContentContext';

const About = () => {
  const { content } = useContent();

  return (
    <section id="about" className="ega-about">
      <div className="ega-container">
        <div className="ega-section-header">
          <h2 className="ega-section-title">{content.about.title}</h2>
          <div className="ega-section-divider"></div>
        </div>

        <div className="ega-about-cards">
          <div className="ega-about-card">
            <div className="ega-card-icon">👁️</div>
            <h3>Vision</h3>
            <p>{content.about.vision}</p>
          </div>
          <div className="ega-about-card">
            <div className="ega-card-icon">🎯</div>
            <h3>Mission</h3>
            <p>{content.about.mission}</p>
          </div>
          <div className="ega-about-card">
            <div className="ega-card-icon">💎</div>
            <h3>Valeurs</h3>
            <p>{content.about.values}</p>
          </div>
        </div>

        <div className="ega-timeline">
          <h3 className="ega-timeline-title">Notre Histoire</h3>
          <div className="ega-timeline-container">
            {content.about.timeline.map((item, index) => (
              <div key={index} className="ega-timeline-item">
                <div className="ega-timeline-dot"></div>
                <div className="ega-timeline-content">
                  <span className="ega-timeline-year">{item.year}</span>
                  <p className="ega-timeline-event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
