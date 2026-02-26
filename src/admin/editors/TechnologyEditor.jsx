import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const TechnologyEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.technology);
  const [originalData, setOriginalData] = useState(content.technology);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.technology);
    setOriginalData(content.technology);
  }, [content.technology]);

  const handlePillarChange = (index, field, value) => {
    const newPillars = [...formData.pillars];
    newPillars[index] = {
      ...newPillars[index],
      [field]: value
    };
    setFormData({
      ...formData,
      pillars: newPillars
    });
  };

  const handleSave = () => {
    updateContent('technology', formData);
    addActivity('Technology section updated');
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
        <h1>Éditer Technologie</h1>
        <p>Modifier les piliers technologiques et descriptions</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <h3>Piliers Technologiques</h3>
          {formData.pillars.map((pillar, index) => (
            <div key={index} className="adm-pillar-item">
              <h4>Pilier {index + 1}</h4>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label htmlFor={`icon-${index}`}>Icône</label>
                  <input
                    type="text"
                    id={`icon-${index}`}
                    value={pillar.icon}
                    onChange={(e) => handlePillarChange(index, 'icon', e.target.value)}
                    className="adm-input"
                    placeholder="⬡, ⬢, ◎, ▣"
                  />
                </div>
                <div className="adm-form-group">
                  <label htmlFor={`title-${index}`}>Titre</label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    value={pillar.title}
                    onChange={(e) => handlePillarChange(index, 'title', e.target.value)}
                    className="adm-input"
                  />
                </div>
              </div>
              <div className="adm-form-group">
                <label htmlFor={`desc-${index}`}>Description</label>
                <textarea
                  id={`desc-${index}`}
                  value={pillar.desc}
                  onChange={(e) => handlePillarChange(index, 'desc', e.target.value)}
                  rows={4}
                  className="adm-textarea"
                />
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
          <div className="adm-tech-preview">
            {formData.pillars.map((pillar, index) => (
              <div key={index} className="adm-pillar-preview">
                <div className="adm-pillar-preview-icon">{pillar.icon}</div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
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

export default TechnologyEditor;
