import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const AboutEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [formData, setFormData] = useState(content.about);
  const [originalData, setOriginalData] = useState(content.about);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(content.about);
    setOriginalData(content.about);
  }, [content.about]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = {
      ...newTimeline[index],
      [field]: value
    };
    setFormData({
      ...formData,
      timeline: newTimeline
    });
  };

  const addTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { year: '', event: '' }]
    });
  };

  const removeTimelineItem = (index) => {
    const newTimeline = formData.timeline.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      timeline: newTimeline
    });
  };

  const handleSave = () => {
    updateContent('about', formData);
    addActivity('About section updated');
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
        <h1>Éditer À Propos</h1>
        <p>Modifier les informations de la section À Propos</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-editor-form">
          <div className="adm-form-group">
            <label htmlFor="title">Titre de la section</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="adm-input"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="vision">Vision</label>
            <textarea
              id="vision"
              value={formData.vision}
              onChange={(e) => handleInputChange('vision', e.target.value)}
              rows={4}
              className="adm-textarea"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="mission">Mission</label>
            <textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => handleInputChange('mission', e.target.value)}
              rows={4}
              className="adm-textarea"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="values">Valeurs</label>
            <textarea
              id="values"
              value={formData.values}
              onChange={(e) => handleInputChange('values', e.target.value)}
              rows={3}
              className="adm-textarea"
            />
          </div>

          <div className="adm-form-section">
            <h3>Timeline</h3>
            {formData.timeline.map((item, index) => (
              <div key={index} className="adm-timeline-item">
                <div className="adm-timeline-fields">
                  <input
                    type="text"
                    placeholder="Année"
                    value={item.year}
                    onChange={(e) => handleTimelineChange(index, 'year', e.target.value)}
                    className="adm-input adm-input-small"
                  />
                  <input
                    type="text"
                    placeholder="Événement"
                    value={item.event}
                    onChange={(e) => handleTimelineChange(index, 'event', e.target.value)}
                    className="adm-input"
                  />
                  <button
                    onClick={() => removeTimelineItem(index)}
                    className="adm-btn adm-btn-danger adm-btn-small"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <button onClick={addTimelineItem} className="adm-btn adm-btn-secondary">
              + Ajouter une étape
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
      </div>

      {showToast && (
        <div className="adm-toast">
          ✓ Modifications enregistrées
        </div>
      )}
    </div>
  );
};

export default AboutEditor;
