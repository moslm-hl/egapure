import React from 'react';
import { useContent } from '../context/ContentContext';

const Technology = () => {
  const { content } = useContent();

  return (
    <section id="technology" className="ega-technology">
      <div className="ega-container">
        <div className="ega-section-header">
          <h2 className="ega-section-title">Notre Technologie</h2>
          <div className="ega-section-divider"></div>
        </div>

        <div className="ega-tech-pillars">
          {content.technology.pillars.map((pillar, index) => (
            <div key={index} className="ega-tech-pillar">
              <div className="ega-pillar-icon">{pillar.icon}</div>
              <h3 className="ega-pillar-title">{pillar.title}</h3>
              <p className="ega-pillar-description">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="ega-comparison">
          <h3 className="ega-comparison-title">Performance Comparée</h3>
          <div className="ega-comparison-table">
            <div className="ega-table-header">
              <div className="ega-table-cell">Matériau</div>
              <div className="ega-table-cell">Conductivité (W/m·K)</div>
              <div className="ega-table-cell">Épaisseur pour R=5</div>
              <div className="ega-table-cell">Classe Feu</div>
            </div>
            <div className="ega-table-row ega-highlighted">
              <div className="ega-table-cell">
                <strong>Aérogel EGAPURE</strong>
              </div>
              <div className="ega-table-cell">0.015</div>
              <div className="ega-table-cell">75mm</div>
              <div className="ega-table-cell">A1</div>
            </div>
            <div className="ega-table-row">
              <div className="ega-table-cell">Laine de verre</div>
              <div className="ega-table-cell">0.040</div>
              <div className="ega-table-cell">200mm</div>
              <div className="ega-table-cell">A1</div>
            </div>
            <div className="ega-table-row">
              <div className="ega-table-cell">Polystyrène</div>
              <div className="ega-table-cell">0.035</div>
              <div className="ega-table-cell">175mm</div>
              <div className="ega-table-cell">E</div>
            </div>
            <div className="ega-table-row">
              <div className="ega-table-cell">Polyuréthane</div>
              <div className="ega-table-cell">0.025</div>
              <div className="ega-table-cell">125mm</div>
              <div className="ega-table-cell">B</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
