import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const SiteSettingsEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.siteSettings);
  const [originalData, setOriginalData] = useState(content.siteSettings);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.siteSettings);
    setOriginalData(content.siteSettings);
  }, [content.siteSettings]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    updateContent('siteSettings', formData);
    addActivity('Site settings updated');
    setOriginalData(formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

  const resetToDefaults = () => {
    const defaults = {
      title: "EGAPURE — Isolation Biologique",
      description: "Solutions d'isolation biologique à base d'aérogel",
      ogImage: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#4A7C3F",
      accentColor: "#8B6343",
      darkBg: "#0A0A0A",
      lightText: "#F0F0F0",
      subtleGray: "#2A2A2A"
    };
    setFormData(defaults);
  };

  return (
    <div className="adm-editor">
      <div className="adm-editor-header">
        <h1>Paramètres du Site</h1>
        <p>Configuration générale et métadonnées du site</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-section">
            <h3>Informations Générales</h3>
            
            <div className="adm-form-group">
              <label htmlFor="title">Titre du Site</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="adm-input"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="description">Description du Site</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="adm-textarea"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="ogImage">Image Open Graph (URL)</label>
              <input
                type="text"
                id="ogImage"
                value={formData.ogImage}
                onChange={(e) => handleInputChange('ogImage', e.target.value)}
                className="adm-input"
                placeholder="/logo.png"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="favicon">Favicon (URL)</label>
              <input
                type="text"
                id="favicon"
                value={formData.favicon}
                onChange={(e) => handleInputChange('favicon', e.target.value)}
                className="adm-input"
                placeholder="/favicon.ico"
              />
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Couleurs du Thème</h3>
            
            <div className="adm-form-row">
              <div className="adm-form-group">
                <label htmlFor="primaryColor">Couleur Principale</label>
                <div className="adm-color-input-group">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="adm-color-input"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="adm-input adm-color-text"
                    placeholder="#4A7C3F"
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label htmlFor="accentColor">Couleur d'Accent</label>
                <div className="adm-color-input-group">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    className="adm-color-input"
                  />
                  <input
                    type="text"
                    value={formData.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    className="adm-input adm-color-text"
                    placeholder="#8B6343"
                  />
                </div>
              </div>
            </div>

            <div className="adm-form-row">
              <div className="adm-form-group">
                <label htmlFor="darkBg">Arrière-plan Sombre</label>
                <div className="adm-color-input-group">
                  <input
                    type="color"
                    value={formData.darkBg}
                    onChange={(e) => handleInputChange('darkBg', e.target.value)}
                    className="adm-color-input"
                  />
                  <input
                    type="text"
                    value={formData.darkBg}
                    onChange={(e) => handleInputChange('darkBg', e.target.value)}
                    className="adm-input adm-color-text"
                    placeholder="#0A0A0A"
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label htmlFor="lightText">Texte Clair</label>
                <div className="adm-color-input-group">
                  <input
                    type="color"
                    value={formData.lightText}
                    onChange={(e) => handleInputChange('lightText', e.target.value)}
                    className="adm-color-input"
                  />
                  <input
                    type="text"
                    value={formData.lightText}
                    onChange={(e) => handleInputChange('lightText', e.target.value)}
                    className="adm-input adm-color-text"
                    placeholder="#F0F0F0"
                  />
                </div>
              </div>
            </div>

            <div className="adm-form-group">
              <label htmlFor="subtleGray">Gris Subtil</label>
              <div className="adm-color-input-group">
                <input
                  type="color"
                  value={formData.subtleGray}
                  onChange={(e) => handleInputChange('subtleGray', e.target.value)}
                  className="adm-color-input"
                />
                <input
                  type="text"
                  value={formData.subtleGray}
                  onChange={(e) => handleInputChange('subtleGray', e.target.value)}
                  className="adm-input adm-color-text"
                  placeholder="#2A2A2A"
                />
              </div>
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Options Avancées</h3>
            
            <button 
              onClick={resetToDefaults}
              className="adm-btn adm-btn-secondary"
            >
              Rétablir les valeurs par défaut
            </button>
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
          <h3>Aperçu des Couleurs</h3>
          <div className="adm-color-preview">
            <div className="adm-color-swatch" style={{ backgroundColor: formData.primaryColor }}>
              <span>Couleur Principale</span>
              <small>{formData.primaryColor}</small>
            </div>
            <div className="adm-color-swatch" style={{ backgroundColor: formData.accentColor }}>
              <span>Couleur d'Accent</span>
              <small>{formData.accentColor}</small>
            </div>
            <div className="adm-color-swatch" style={{ backgroundColor: formData.darkBg, color: formData.lightText }}>
              <span>Arrière-plan Sombre</span>
              <small>{formData.darkBg}</small>
            </div>
            <div className="adm-color-swatch" style={{ backgroundColor: formData.lightText, color: formData.darkBg }}>
              <span>Texte Clair</span>
              <small>{formData.lightText}</small>
            </div>
            <div className="adm-color-swatch" style={{ backgroundColor: formData.subtleGray, color: formData.lightText }}>
              <span>Gris Subtil</span>
              <small>{formData.subtleGray}</small>
            </div>
          </div>

          <div className="adm-seo-preview">
            <h4>Aperçu SEO</h4>
            <div className="adm-seo-card">
              <h5>{formData.title}</h5>
              <p>{formData.description}</p>
              <div className="adm-seo-url">your-domain.com</div>
              {formData.ogImage && (
                <div className="adm-seo-image">
                  <img src={formData.ogImage} alt="OG Image" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
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

export default SiteSettingsEditor;
