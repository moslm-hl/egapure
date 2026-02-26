import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

const Contact = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire envoyé! (Cette démo est uniquement visuelle)');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="ega-contact">
      <div className="ega-container">
        <div className="ega-section-header">
          <h2 className="ega-section-title">Contactez-Nous</h2>
          <div className="ega-section-divider"></div>
        </div>

        <div className="ega-contact-content">
          <div className="ega-contact-info">
            <div className="ega-contact-card">
              <div className="ega-contact-icon">📍</div>
              <h3>Adresse</h3>
              <p>{content.contact.address}</p>
            </div>
            <div className="ega-contact-card">
              <div className="ega-contact-icon">📞</div>
              <h3>Téléphone</h3>
              <p>{content.contact.phone}</p>
            </div>
            <div className="ega-contact-card">
              <div className="ega-contact-icon">✉️</div>
              <h3>Email</h3>
              <p>{content.contact.email}</p>
            </div>
            <div className="ega-contact-card">
              <div className="ega-contact-icon">🌐</div>
              <h3>Site Web</h3>
              <p>{content.contact.website}</p>
            </div>
          </div>

          <div className="ega-contact-form">
            <h3>Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit}>
              <div className="ega-form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="ega-form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="ega-form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ega-form-group">
                <textarea
                  name="message"
                  placeholder="Votre message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="ega-btn ega-btn-primary">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

        <div className="ega-social-links">
          <a href={content.contact.linkedin} className="ega-social-link">
            <span>LinkedIn</span>
          </a>
          <a href={content.contact.facebook} className="ega-social-link">
            <span>Facebook</span>
          </a>
          <a href={content.contact.instagram} className="ega-social-link">
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
