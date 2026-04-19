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

    console.log('Submitting login with:', { username, password: '***' });
    
    const success = login(username, password);
    
    console.log('Login result:', success);
    
    if (success) {
      console.log('Redirecting to dashboard...');
      navigate('/admin/dashboard');
    } else {
      console.log('Login failed');
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
          {/* Debug Section - Remove in production */}
          <div style={{ background: '#2a3441', padding: '15px', borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: '#8b9bb4' }}>
            <strong>Debug Info:</strong><br/>
            Authenticated: {isAuthenticated ? 'YES' : 'NO'}<br/>
            Username: "{username}"<br/>
            Password length: {password.length}<br/>
            <button 
              type="button" 
              onClick={() => {
                console.log('Test login with admin/egapure2025');
                setUsername('admin');
                setPassword('egapure2025');
              }}
              style={{ 
                background: '#4A7C3F', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px', 
                borderRadius: '4px', 
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              Auto-fill Credentials
            </button>
          </div>

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
