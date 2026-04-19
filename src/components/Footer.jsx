import React from 'react';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content } = useContent();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="ega-footer">
      <div className="ega-container">
        <div className="ega-footer-content">
          <div className="ega-footer-brand">
            <div className="ega-footer-logo">
              <img 
                src="/logo.png" 
                alt="EGAPURE"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="ega-footer-logo-placeholder" style={{ display: 'none' }}>
                EGAPURE
              </div>
            </div>
            <p className="ega-footer-tagline">Isolation Biologique</p>
            <p className="ega-footer-description">
              Solutions innovantes d'isolation thermique à base d'aérogel de silice pour un avenir durable.
            </p>
            <p style={{ color: '#8B9BB4', fontSize: '0.8rem', marginTop: '8px' }}>
              Created by: {content.siteSettings.creator}
            </p>
          </div>

          <div className="ega-footer-links">
            <div className="ega-footer-column">
              <h4>Navigation</h4>
              <button onClick={() => scrollToSection('hero')}>Accueil</button>
              <button onClick={() => scrollToSection('about')}>À Propos</button>
              <button onClick={() => scrollToSection('products')}>Produits</button>
              <button onClick={() => scrollToSection('technology')}>Technologie</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>
            <div className="ega-footer-column">
              <h4>Contact</h4>
              <p>{content.contact.address}</p>
              <p>{content.contact.phone}</p>
              <p>{content.contact.email}</p>
            </div>
            <div className="ega-footer-column">
              <h4>Suivez-nous</h4>
              <a href={content.contact.linkedin}>LinkedIn</a>
              <a href={content.contact.facebook}>Facebook</a>
              <a href={content.contact.instagram}>Instagram</a>
            </div>
          </div>
        </div>

        <div className="ega-footer-bottom">
          <div className="ega-footer-divider"></div>
          <p>&copy; 2025 EGAPURE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
