import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthTest = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleTestLogin = () => {
    console.log('Testing login...');
    const result = login('admin', 'egapure2025');
    console.log('Login result:', result);
    if (result) {
      navigate('/admin/dashboard');
    }
  };

  const handleTestLogout = () => {
    console.log('Testing logout...');
    logout();
  };

  return (
    <div style={{ padding: '20px', background: '#1e2530', color: '#cdd9e5', minHeight: '100vh' }}>
      <h1>Authentication Test Page</h1>
      <p>Current auth status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleTestLogin}
          style={{ 
            background: '#4A7C3F', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            marginRight: '10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Login (admin/egapure2025)
        </button>
        
        <button 
          onClick={handleTestLogout}
          style={{ 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Logout
        </button>
      </div>

      <div style={{ marginTop: '30px', background: '#2a3441', padding: '15px', borderRadius: '6px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Open browser console (F12)</li>
          <li>Click "Test Login" button</li>
          <li>Check console logs for authentication process</li>
          <li>If successful, you should be redirected to dashboard</li>
          <li>If not successful, check console for errors</li>
        </ol>
      </div>

      <div style={{ marginTop: '20px' }}>
        <a href="/admin/login" style={{ color: '#4A7C3F' }}>← Back to Login</a>
      </div>
    </div>
  );
};

export default AuthTest;
