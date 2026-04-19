import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const FooterEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.footer);
  const [originalData, setOriginalData] = useState(content.footer);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.footer);
    setOriginalData(content.footer);
  }, [content.footer]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...formData.quickLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    setFormData({
      ...formData,
      quickLinks: newLinks
    });
  };

  const handleAdditionalLinkChange = (index, field, value) => {
    const newLinks = [...formData.additionalLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    setFormData({
      ...formData,
      additionalLinks: newLinks
    });
  };

  const addQuickLink = () => {
    const newLink = {
      id: Math.max(...formData.quickLinks.map(l => l.id), 0) + 1,
      text: '',
      target: ''
    };
    setFormData({
      ...formData,
      quickLinks: [...formData.quickLinks, newLink]
    });
  };

  const removeQuickLink = (index) => {
    const newLinks = formData.quickLinks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      quickLinks: newLinks
    });
  };

  const addAdditionalLink = () => {
    const newLink = {
      id: Math.max(...formData.additionalLinks.map(l => l.id), 0) + 1,
      text: '',
      url: ''
    };
    setFormData({
      ...formData,
      additionalLinks: [...formData.additionalLinks, newLink]
    });
  };

  const removeAdditionalLink = (index) => {
    const newLinks = formData.additionalLinks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      additionalLinks: newLinks
    });
  };

  const handleSave = () => {
    updateContent('footer', formData);
    addActivity('Footer configuration updated');
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
        <h1>Éditer Footer</h1>
        <p>Personnaliser le pied de page et les informations</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-section">
            <h3>Informations Principales</h3>
            
            <div className="adm-form-group">
              <label htmlFor="logoSrc">URL du Logo</label>
              <input
                type="text"
                id="logoSrc"
                value={formData.logoSrc}
                onChange={(e) => handleInputChange('logoSrc', e.target.value)}
                className="adm-input"
                placeholder="/logo.png"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="tagline">Tagline</label>
              <input
                type="text"
                id="tagline"
                value={formData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="adm-input"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="adm-textarea"
              />
            </div>

            <div className="adm-form-group">
              <label htmlFor="copyrightText">Texte Copyright</label>
              <input
                type="text"
                id="copyrightText"
                value={formData.copyrightText}
                onChange={(e) => handleInputChange('copyrightText', e.target.value)}
                className="adm-input"
              />
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Options d'Affichage</h3>
            
            <div className="adm-form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.showQuickLinks}
                  onChange={(e) => handleInputChange('showQuickLinks', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Afficher les liens rapides
              </label>
            </div>

            <div className="adm-form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.showContactInfo}
                  onChange={(e) => handleInputChange('showContactInfo', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Afficher les informations de contact
              </label>
            </div>

            <div className="adm-form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.showSocialLinks}
                  onChange={(e) => handleInputChange('showSocialLinks', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Afficher les liens sociaux
              </label>
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Liens Rapides</h3>
            {formData.quickLinks.map((link, index) => (
              <div key={link.id} className="adm-link-item">
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Texte du lien</label>
                    <input
                      type="text"
                      value={link.text}
                      onChange={(e) => handleQuickLinkChange(index, 'text', e.target.value)}
                      className="adm-input"
                      placeholder="Accueil"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Cible (section)</label>
                    <input
                      type="text"
                      value={link.target}
                      onChange={(e) => handleQuickLinkChange(index, 'target', e.target.value)}
                      className="adm-input"
                      placeholder="hero"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>&nbsp;</label>
                    <button
                      onClick={() => removeQuickLink(index)}
                      className="adm-btn adm-btn-danger adm-btn-small"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addQuickLink} className="adm-btn adm-btn-secondary">
              + Ajouter un lien rapide
            </button>
          </div>

          <div className="adm-form-section">
            <h3>Liens Supplémentaires</h3>
            {formData.additionalLinks.map((link, index) => (
              <div key={link.id} className="adm-link-item">
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Texte du lien</label>
                    <input
                      type="text"
                      value={link.text}
                      onChange={(e) => handleAdditionalLinkChange(index, 'text', e.target.value)}
                      className="adm-input"
                      placeholder="Politique de confidentialité"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleAdditionalLinkChange(index, 'url', e.target.value)}
                      className="adm-input"
                      placeholder="#"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>&nbsp;</label>
                    <button
                      onClick={() => removeAdditionalLink(index)}
                      className="adm-btn adm-btn-danger adm-btn-small"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addAdditionalLink} className="adm-btn adm-btn-secondary">
              + Ajouter un lien supplémentaire
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
          <h3>Aperçu</h3>
          <div className="adm-footer-preview">
            <div className="adm-footer-preview-brand">
              <div className="adm-footer-preview-logo">
                <img 
                  src={formData.logoSrc} 
                  alt="Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="adm-footer-preview-logo-placeholder" style={{ display: 'none' }}>
                  LOGO
                </div>
              </div>
              <div className="adm-footer-preview-tagline">{formData.tagline}</div>
              <div className="adm-footer-preview-description">{formData.description}</div>
            </div>
            
            {formData.showQuickLinks && (
              <div className="adm-footer-preview-section">
                <h4>Liens Rapides</h4>
                {formData.quickLinks.map((link) => (
                  <div key={link.id} className="adm-preview-link">
                    {link.text || 'Lien'}
                  </div>
                ))}
              </div>
            )}
            
            <div className="adm-footer-preview-copyright">
              {formData.copyrightText}
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

export default FooterEditor;
