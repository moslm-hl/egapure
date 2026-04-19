import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const NavbarEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.navbar);
  const [originalData, setOriginalData] = useState(content.navbar);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.navbar);
    setOriginalData(content.navbar);
  }, [content.navbar]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    setFormData({
      ...formData,
      links: newLinks
    });
  };

  const addLink = () => {
    const newLink = {
      id: Math.max(...formData.links.map(l => l.id), 0) + 1,
      text: '',
      target: ''
    };
    setFormData({
      ...formData,
      links: [...formData.links, newLink]
    });
  };

  const removeLink = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      links: newLinks
    });
  };

  const moveLink = (index, direction) => {
    const newLinks = [...formData.links];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < formData.links.length) {
      [newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]];
      setFormData({
        ...formData,
        links: newLinks
      });
    }
  };

  const handleSave = () => {
    updateContent('navbar', formData);
    addActivity('Navbar configuration updated');
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
        <h1>Éditer Navbar</h1>
        <p>Personnaliser la barre de navigation et les liens</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-section">
            <h3>Configuration Générale</h3>
            
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
              <label>
                <input
                  type="checkbox"
                  checked={formData.showAdminLink}
                  onChange={(e) => handleInputChange('showAdminLink', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                Afficher le lien Admin
              </label>
            </div>

            <div className="adm-form-group">
              <label htmlFor="adminLinkText">Texte du lien Admin</label>
              <input
                type="text"
                id="adminLinkText"
                value={formData.adminLinkText}
                onChange={(e) => handleInputChange('adminLinkText', e.target.value)}
                className="adm-input"
                disabled={!formData.showAdminLink}
              />
            </div>
          </div>

          <div className="adm-form-section">
            <h3>Liens de Navigation</h3>
            {formData.links.map((link, index) => (
              <div key={link.id} className="adm-nav-link-item">
                <div className="adm-nav-link-header">
                  <h4>Lien {index + 1}</h4>
                  <div className="adm-nav-link-actions">
                    <button
                      onClick={() => moveLink(index, 'up')}
                      disabled={index === 0}
                      className="adm-btn adm-btn-small"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveLink(index, 'down')}
                      disabled={index === formData.links.length - 1}
                      className="adm-btn adm-btn-small"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeLink(index)}
                      className="adm-btn adm-btn-danger adm-btn-small"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Texte du lien</label>
                    <input
                      type="text"
                      value={link.text}
                      onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                      className="adm-input"
                      placeholder="Accueil"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Cible (section)</label>
                    <input
                      type="text"
                      value={link.target}
                      onChange={(e) => handleLinkChange(index, 'target', e.target.value)}
                      className="adm-input"
                      placeholder="hero"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addLink} className="adm-btn adm-btn-secondary">
              + Ajouter un lien
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
          <div className="adm-navbar-preview">
            <div className="adm-navbar-preview-header">
              <div className="adm-navbar-preview-logo">
                <img 
                  src={formData.logoSrc} 
                  alt="Logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="adm-navbar-preview-logo-placeholder" style={{ display: 'none' }}>
                  LOGO
                </div>
              </div>
              <div className="adm-navbar-preview-links">
                {formData.links.map((link) => (
                  <span key={link.id} className="adm-preview-link">
                    {link.text || 'Lien'}
                  </span>
                ))}
                {formData.showAdminLink && (
                  <span className="adm-preview-link adm-admin-link">
                    {formData.adminLinkText}
                  </span>
                )}
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

export default NavbarEditor;
