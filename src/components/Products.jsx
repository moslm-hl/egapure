import React from 'react';
import { useContent } from '../context/ContentContext';

const Products = () => {
  const { content } = useContent();

  return (
    <section id="products" className="ega-products">
      <div className="ega-container">
        <div className="ega-section-header">
          <h2 className="ega-section-title">Nos Produits</h2>
          <div className="ega-section-divider"></div>
        </div>

        <div className="ega-product-banner">
          <img 
            src="/product.png" 
            alt="Produits EGAPURE"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="ega-product-banner-placeholder" style={{ display: 'none' }}>
            <div className="ega-placeholder-icon">📦</div>
            <p>Nos Solutions d'Isolation</p>
          </div>
        </div>

        <div className="ega-products-grid">
          {content.products.map((product) => (
            <div key={product.id} className="ega-product-card">
              <div className="ega-product-header">
                <span className="ega-product-code">{product.code}</span>
                <span className="ega-product-tag">{product.tag}</span>
              </div>
              <h3 className="ega-product-name">{product.name}</h3>
              <p className="ega-product-description">{product.description}</p>
              <div className="ega-product-specs">
                {product.specs.map((spec, index) => (
                  <div key={index} className="ega-spec-item">
                    <span className="ega-spec-bullet">•</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
              <button className="ega-product-btn">En savoir plus</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
