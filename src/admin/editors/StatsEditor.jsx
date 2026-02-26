import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const StatsEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.stats);
  const [originalData, setOriginalData] = useState(content.stats);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.stats);
    setOriginalData(content.stats);
  }, [content.stats]);

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData];
    newStats[index] = {
      ...newStats[index],
      [field]: value
    };
    setFormData(newStats);
  };

  const handleSave = () => {
    updateContent('stats', formData);
    addActivity('Statistics updated');
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
        <h1>Éditer Statistiques</h1>
        <p>Mettre à jour les chiffres clés de l'entreprise</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-stats-form">
          <h3>Statistiques</h3>
          {formData.map((stat, index) => (
            <div key={index} className="adm-stat-item">
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label htmlFor={`value-${index}`}>Valeur</label>
                  <input
                    type="text"
                    id={`value-${index}`}
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="adm-input"
                    placeholder="ex: 99.8%, 500+, 10 ans"
                  />
                </div>
                <div className="adm-form-group">
                  <label htmlFor={`label-${index}`}>Label</label>
                  <input
                    type="text"
                    id={`label-${index}`}
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="adm-input"
                    placeholder="ex: Porosité de l'Aérogel"
                  />
                </div>
              </div>
            </div>
          ))}

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
          <div className="adm-stats-preview">
            {formData.map((stat, index) => (
              <div key={index} className="adm-stat-preview-card">
                <div className="adm-stat-preview-value">{stat.value}</div>
                <div className="adm-stat-preview-label">{stat.label}</div>
              </div>
            ))}
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

export default StatsEditor;
