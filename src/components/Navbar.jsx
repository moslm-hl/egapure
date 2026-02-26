import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`ega-navbar ${isScrolled ? 'ega-scrolled' : ''}`}>
      <div className="ega-container">
        <div className="ega-nav-content">
          {/* Logo */}
          <div className="ega-logo">
            <img 
              src="/logo.png" 
              alt="EGAPURE" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="ega-logo-placeholder" style={{ display: 'none' }}>
              EGAPURE
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="ega-nav-links">
            <button onClick={() => scrollToSection('hero')} className="ega-nav-link">Accueil</button>
            <button onClick={() => scrollToSection('about')} className="ega-nav-link">À Propos</button>
            <button onClick={() => scrollToSection('products')} className="ega-nav-link">Produits</button>
            <button onClick={() => scrollToSection('technology')} className="ega-nav-link">Technologie</button>
            <button onClick={() => scrollToSection('contact')} className="ega-nav-link">Contact</button>
            <a href="/admin/login" className="ega-nav-link ega-admin-link">Admin</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="ega-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`ega-mobile-menu ${isMobileMenuOpen ? 'ega-open' : ''}`}>
          <button onClick={() => scrollToSection('hero')} className="ega-mobile-link">Accueil</button>
          <button onClick={() => scrollToSection('about')} className="ega-mobile-link">À Propos</button>
          <button onClick={() => scrollToSection('products')} className="ega-mobile-link">Produits</button>
          <button onClick={() => scrollToSection('technology')} className="ega-mobile-link">Technologie</button>
          <button onClick={() => scrollToSection('contact')} className="ega-mobile-link">Contact</button>
          <a href="/admin/login" className="ega-mobile-link ega-admin-link">Admin</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
