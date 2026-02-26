import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const HeroEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.hero);
  const [originalData, setOriginalData] = useState(content.hero);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.hero);
    setOriginalData(content.hero);
  }, [content.hero]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    updateContent('hero', formData);
    addActivity('Hero section updated');
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
        <h1>Éditer Hero</h1>
        <p>Modifier le titre, sous-titre et boutons CTA de la section hero</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-group">
            <label htmlFor="title">Titre Principal</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="adm-input"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="subtitle">Sous-titre</label>
            <textarea
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              rows={3}
              className="adm-textarea"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="cta1">Bouton CTA 1</label>
            <input
              type="text"
              id="cta1"
              value={formData.cta1}
              onChange={(e) => handleInputChange('cta1', e.target.value)}
              className="adm-input"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="cta2">Bouton CTA 2</label>
            <input
              type="text"
              id="cta2"
              value={formData.cta2}
              onChange={(e) => handleInputChange('cta2', e.target.value)}
              className="adm-input"
            />
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
          <div className="adm-hero-preview">
            <h1>{formData.title}</h1>
            <p>{formData.subtitle}</p>
            <div className="adm-hero-buttons">
              <button className="adm-btn adm-btn-primary">{formData.cta1}</button>
              <button className="adm-btn adm-btn-secondary">{formData.cta2}</button>
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

export default HeroEditor;
