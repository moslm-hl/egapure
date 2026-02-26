import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = login(username, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="adm-login-container">
      <div className="adm-login-card">
        <div className="adm-login-header">
          <div className="adm-login-logo">
            <img 
              src="/logo.png" 
              alt="EGAPURE"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="adm-login-logo-placeholder" style={{ display: 'none' }}>
              EGAPURE
            </div>
          </div>
          <h1>Panneau d'Administration</h1>
          <p>Connectez-vous pour accéder au CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="adm-login-form">
          <div className="adm-form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="adm-input"
            />
          </div>

          <div className="adm-form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="adm-password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="adm-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="adm-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && <div className="adm-error-message">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="adm-login-btn"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="adm-login-footer">
          <a href="/">← Retour au site</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
