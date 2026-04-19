import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const AdminDashboard = () => {
  const { recentActivity } = useContent();

  const dashboardCards = [
    { path: '/admin/settings', title: 'Paramètres', description: 'Configuration globale du site, couleurs et métadonnées', icon: '⚙️' },
    { path: '/admin/navbar', title: 'Navbar', description: 'Personnaliser la barre de navigation et les liens', icon: '🧭' },
    { path: '/admin/hero', title: 'Hero', description: 'Modifier le titre, sous-titre et boutons CTA', icon: '✏️' },
    { path: '/admin/about', title: 'À Propos', description: 'Éditer vision, mission, valeurs et timeline', icon: 'ℹ️' },
    { path: '/admin/products', title: 'Produits', description: 'Gérer les produits et leurs spécifications', icon: '📦' },
    { path: '/admin/technology', title: 'Technologie', description: 'Éditer les piliers technologiques', icon: '🔬' },
    { path: '/admin/stats', title: 'Statistiques', description: 'Mettre à jour les chiffres clés', icon: '📊' },
    { path: '/admin/contact', title: 'Contact', description: 'Modifier les informations de contact', icon: '📞' },
    { path: '/admin/footer', title: 'Footer', description: 'Personnaliser le pied de page et les liens', icon: '🦶' },
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="adm-dashboard">
      <div className="adm-dashboard-header">
        <h1>Tableau de Bord</h1>
        <p>Bienvenue sur le panneau d'administration EGAPURE</p>
      </div>

      <div className="adm-dashboard-grid">
        {dashboardCards.map((card, index) => (
          <div key={index} className="adm-dashboard-card">
            <div className="adm-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={card.path} className="adm-card-link">
              Modifier →
            </Link>
          </div>
        ))}
      </div>

      <div className="adm-dashboard-activity">
        <h2>Activité Récente</h2>
        <div className="adm-activity-list">
          {recentActivity.length > 0 ? (
            recentActivity.slice().reverse().map((activity, index) => (
              <div key={index} className="adm-activity-item">
                <div className="adm-activity-time">
                  {formatTimestamp(activity.timestamp)}
                </div>
                <div className="adm-activity-action">
                  {activity.action}
                </div>
              </div>
            ))
          ) : (
            <p className="adm-no-activity">Aucune activité récente</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
