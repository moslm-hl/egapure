import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '🏠', label: 'Tableau de bord' },
    { path: '/admin/hero', icon: '✏️', label: 'Hero' },
    { path: '/admin/about', icon: 'ℹ️', label: 'À Propos' },
    { path: '/admin/products', icon: '📦', label: 'Produits' },
    { path: '/admin/stats', icon: '📊', label: 'Statistiques' },
    { path: '/admin/contact', icon: '📞', label: 'Contact' },
    { path: '/admin/technology', icon: '⚙️', label: 'Technologie' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <div className={`adm-sidebar ${sidebarOpen ? 'adm-open' : 'adm-closed'}`}>
        <div className="adm-sidebar-header">
          <div className="adm-sidebar-logo">
            <img 
              src="/logo.png" 
              alt="EGAPURE"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="adm-sidebar-logo-placeholder" style={{ display: 'none' }}>
              EGAPURE
            </div>
          </div>
          <span className="adm-sidebar-title">Admin Panel</span>
        </div>

        <nav className="adm-sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`adm-nav-item ${isActive(item.path) ? 'adm-active' : ''}`}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span className="adm-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <button onClick={handleLogout} className="adm-logout-btn">
            <span>🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="adm-main">
        {/* Topbar */}
        <div className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="adm-sidebar-toggle"
            >
              ☰
            </button>
            <span className="adm-welcome">Bienvenue, Admin</span>
          </div>
          
          <div className="adm-topbar-center">
            <span className="adm-current-date">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="adm-topbar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-view-site-btn">
              Voir le site →
            </a>
          </div>
        </div>

        {/* Page Content */}
        <div className="adm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
