import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const ContactEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.contact);
  const [originalData, setOriginalData] = useState(content.contact);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.contact);
    setOriginalData(content.contact);
  }, [content.contact]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    updateContent('contact', formData);
    addActivity('Contact information updated');
    setOriginalData(formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

  return (
    <div className="adm-editor">
      <div className="adm-editor-header">
        <h1>Éditer Contact</h1>
        <p>Modifier les informations de contact et réseaux sociaux</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-section">
            <h3>Informations de contact</h3>
            
            <div className="adm-form-group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="adm-input"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="adm-input"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="adm-input"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="website">Site Web</label>
              <input
                type="text"
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="adm-input"
              />
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Réseaux Sociaux</h3>
            
            <div className="adm-form-group">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="text"
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="adm-input"
                placeholder="https://linkedin.com/company/egapure"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="facebook">Facebook URL</label>
              <input
                type="text"
                id="facebook"
                value={formData.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                className="adm-input"
                placeholder="https://facebook.com/egapure"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="instagram">Instagram URL</label>
              <input
                type="text"
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                className="adm-input"
                placeholder="https://instagram.com/egapure"
              />
            </div>
          </div>

          <div className="adm-form-actions">
            <button onClick={handleSave} className="adm-btn adm-btn-primary">
              Enregistrer
            </button>
            <button onClick={handleCancel} className="adm-btn adm-btn-secondary">
              Annuler
            </button>
          </div>
        </div>

        <div className="adm-editor-preview">
          <h3>Aperçu</h3>
          <div className="adm-contact-preview">
            <div className="adm-contact-card">
              <strong>Adresse:</strong> {formData.address}
            </div>
            <div className="adm-contact-card">
              <strong>Téléphone:</strong> {formData.phone}
            </div>
            <div className="adm-contact-card">
              <strong>Email:</strong> {formData.email}
            </div>
            <div className="adm-contact-card">
              <strong>Site Web:</strong> {formData.website}
            </div>
            <div className="adm-social-preview">
              <strong>Réseaux Sociaux:</strong>
              <div className="adm-social-links">
                {formData.linkedin && <div>LinkedIn: {formData.linkedin}</div>}
                {formData.facebook && <div>Facebook: {formData.facebook}</div>}
                {formData.instagram && <div>Instagram: {formData.instagram}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="adm-toast">
          ✓ Modifications enregistrées
        </div>
      )}
    </div>
  );
};

export default ContactEditor;
