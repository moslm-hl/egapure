import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

const ProductsEditor = () => {
  const { content, updateContent, addActivity } = useContent();
  const [products, setProducts] = useState(content.products);
  const [originalProducts, setOriginalProducts] = useState(content.products);
  const [editingId, setEditingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setProducts(content.products);
    setOriginalProducts(content.products);
  }, [content.products]);

  const handleProductChange = (id, field, value) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const handleSpecChange = (productId, specIndex, value) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newSpecs = [...product.specs];
        newSpecs[specIndex] = value;
        return { ...product, specs: newSpecs };
      }
      return product;
    }));
  };

  const addSpec = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, specs: [...product.specs, ''] };
      }
      return product;
    }));
  };

  const removeSpec = (productId, specIndex) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newSpecs = product.specs.filter((_, index) => index !== specIndex);
        return { ...product, specs: newSpecs };
      }
      return product;
    }));
  };

  const addProduct = () => {
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      code: '',
      name: '',
      tag: '',
      description: '',
      specs: ['']
    };
    setProducts([...products, newProduct]);
    setEditingId(newProduct.id);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setDeleteConfirm(null);
  };

  const moveProduct = (index, direction) => {
    const newProducts = [...products];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < products.length) {
      [newProducts[index], newProducts[newIndex]] = [newProducts[newIndex], newProducts[index]];
      setProducts(newProducts);
    }
  };

  const handleSave = () => {
    updateContent('products', products);
    addActivity('Products updated');
    setOriginalProducts(products);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setProducts(originalProducts);
    setEditingId(null);
  };

  return (
    <div className="adm-editor">
      <div className="adm-editor-header">
        <h1>Éditer Produits</h1>
        <p>Gérer les produits et leurs spécifications</p>
      </div>

      <div className="adm-editor-content">
        <div className="adm-products-list">
          <div className="adm-products-header">
            <h3>Liste des produits</h3>
            <button onClick={addProduct} className="adm-btn adm-btn-primary">
              + Ajouter un produit
            </button>
          </div>

          {products.map((product, index) => (
            <div key={product.id} className="adm-product-item">
              <div className="adm-product-header">
                <h4>{product.name || 'Nouveau produit'}</h4>
                <div className="adm-product-actions">
                  <button
                    onClick={() => moveProduct(index, 'up')}
                    disabled={index === 0}
                    className="adm-btn adm-btn-small"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveProduct(index, 'down')}
                    disabled={index === products.length - 1}
                    className="adm-btn adm-btn-small"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                    className="adm-btn adm-btn-small"
                  >
                    {editingId === product.id ? 'Annuler' : 'Modifier'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="adm-btn adm-btn-danger adm-btn-small"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {editingId === product.id && (
                <div className="adm-product-form">
                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Code produit</label>
                      <input
                        type="text"
                        value={product.code}
                        onChange={(e) => handleProductChange(product.id, 'code', e.target.value)}
                        className="adm-input"
                      />
                    </div>
                    <div className="adm-form-group">
                      <label>Nom</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                        className="adm-input"
                      />
                    </div>
                  </div>

                  <div className="adm-form-group">
                    <label>Catégorie</label>
                    <input
                      type="text"
                      value={product.tag}
                      onChange={(e) => handleProductChange(product.id, 'tag', e.target.value)}
                      className="adm-input"
                    />
                  </div>

                  <div className="adm-form-group">
                    <label>Description</label>
                    <textarea
                      value={product.description}
                      onChange={(e) => handleProductChange(product.id, 'description', e.target.value)}
                      rows={3}
                      className="adm-textarea"
                    />
                  </div>

                  <div className="adm-form-group">
                    <label>Spécifications</label>
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="adm-spec-row">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecChange(product.id, specIndex, e.target.value)}
                          className="adm-input"
                        />
                        <button
                          onClick={() => removeSpec(product.id, specIndex)}
                          className="adm-btn adm-btn-danger adm-btn-small"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addSpec(product.id)} className="adm-btn adm-btn-secondary adm-btn-small">
                      + Ajouter une spéc
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="adm-form-actions">
          <button onClick={handleSave} className="adm-btn adm-btn-primary">
            Enregistrer tout
          </button>
          <button onClick={handleCancel} className="adm-btn adm-btn-secondary">
            Annuler
          </button>
        </div>
      </div>

      {deleteConfirm && (
        <div className="adm-modal">
          <div className="adm-modal-content">
            <h3>Confirmation de suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="adm-modal-actions">
              <button
                onClick={() => deleteProduct(deleteConfirm)}
                className="adm-btn adm-btn-danger"
              >
                Supprimer
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="adm-btn adm-btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="adm-toast">
          ✓ Modifications enregistrées
        </div>
      )}
    </div>
  );
};

export default ProductsEditor;
