import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const initialContent = {
  // Global Site Settings
  siteSettings: {
    title: "EGAPURE — Isolation Biologique",
    description: "Solutions d'isolation biologique à base d'aérogel",
    ogImage: "/logo.png",
    favicon: "/favicon.ico",
    primaryColor: "#4A7C3F",
    accentColor: "#8B6343",
    darkBg: "#0A0A0A",
    lightText: "#F0F0F0",
    subtleGray: "#2A2A2A"
  },
  
  // Navbar Settings
  navbar: {
    logoSrc: "/logo.png",
    showAdminLink: true,
    adminLinkText: "Admin",
    links: [
      { id: 1, text: "Accueil", target: "hero" },
      { id: 2, text: "À Propos", target: "about" },
      { id: 3, text: "Produits", target: "products" },
      { id: 4, text: "Technologie", target: "technology" },
      { id: 5, text: "Contact", target: "contact" }
    ]
  },

  hero: {
    title: "L'Isolation du Futur, Aujourd'hui",
    subtitle: "Panneaux isolants biologiques à base d'aérogel de silice",
    description: "Découvrez notre technologie révolutionnaire d'isolation thermique qui allie performance écologique et efficacité énergétique.",
    backgroundImage: "",
    showStats: true,
    cta1: "Découvrir nos produits",
    cta2: "Nous contacter",
    cta1Target: "products",
    cta2Target: "contact"
  },
  about: {
    title: "Qui Sommes-Nous ?",
    vision: "Devenir le leader mondial des solutions d'isolation biologique, en offrant des produits innovants qui respectent l'environnement tout en garantissant une performance thermique exceptionnelle.",
    mission: "Développer et commercialiser des panneaux isolants à base d'aérogel de silice pour réduire l'empreinte carbone des bâtiments résidentiels et industriels à travers le monde.",
    values: "Innovation - Durabilité - Excellence - Intégrité - Collaboration",
    timeline: [
      { year: "2020", event: "Fondation d'EGAPURE à Tunis" },
      { year: "2022", event: "Premier brevet aérogel déposé" },
      { year: "2024", event: "Certification Européenne CE" },
      { year: "2025", event: "Expansion 18 pays" }
    ]
  },
  products: [
    {
      id: 1,
      code: "EGA-1",
      name: "EgaPanel Ultra",
      tag: "Bâtiment Résidentiel",
      description: "Panneau isolant ultra-mince pour les murs et toitures résidentielles. Performance thermique exceptionnelle avec seulement 10mm d'épaisseur.",
      specs: ["λ = 0.015 W/m·K", "10mm = 100mm laine de verre", "Classé A1 Feu"]
    },
    {
      id: 2,
      code: "EGA-2",
      name: "EgaPanel Pro",
      tag: "Bâtiment Industriel",
      description: "Solution d'isolation haute performance pour les bâtiments industriels et commerciaux. Résistance mécanique renforcée.",
      specs: ["λ = 0.014 W/m·K", "15mm = 150mm laine de verre", "Classé A1 Feu", "Résistance compression 150 kPa"]
    },
    {
      id: 3,
      code: "EGA-3",
      name: "EgaPanel Tech",
      tag: "Applications Spéciales",
      description: "Panneaux techniques pour applications cryogéniques et haute température. Stabilité thermique extrême.",
      specs: ["λ = 0.013 W/m·K", "20mm = 200mm laine de verre", "Range: -200°C à +650°C", "Classé A1 Feu"]
    },
    {
      id: 4,
      code: "EGA-4",
      name: "EgaPanel Eco",
      tag: "Solution Économique",
      description: "Panneaux isolants écologiques avec matériaux recyclés. Performance optimale pour un budget maîtrisé.",
      specs: ["λ = 0.016 W/m·K", "12mm = 120mm laine de verre", "85% matériaux recyclés", "Classé A1 Feu"]
    }
  ],
  stats: [
    { value: "99.8%", label: "Porosité de l'Aérogel" },
    { value: "0.015", label: "W/m·K Conductivité" },
    { value: "18", label: "Pays Desservis" },
    { value: "500+", label: "Projets Livrés" },
    { value: "10 ans", label: "d'Expertise" },
    { value: "3", label: "Brevets Déposés" }
  ],
  contact: {
    address: "Zone Industrielle, Tunis, Tunisie",
    phone: "+216 71 000 000",
    email: "contact@egapure.tn",
    website: "www.egapure.tn",
    linkedin: "#",
    facebook: "#",
    instagram: "#"
  },
  
  // Footer Settings
  footer: {
    logoSrc: "/logo.png",
    tagline: "Isolation Biologique",
    description: "Solutions innovantes d'isolation thermique à base d'aérogel de silice pour un avenir durable.",
    showQuickLinks: true,
    showContactInfo: true,
    showSocialLinks: true,
    quickLinks: [
      { id: 1, text: "Accueil", target: "hero" },
      { id: 2, text: "À Propos", target: "about" },
      { id: 3, text: "Produits", target: "products" },
      { id: 4, text: "Technologie", target: "technology" },
      { id: 5, text: "Contact", target: "contact" }
    ],
    copyrightText: "© 2025 EGAPURE. Tous droits réservés.",
    additionalLinks: [
      { id: 1, text: "Politique de confidentialité", url: "#" },
      { id: 2, text: "Mentions légales", url: "#" },
      { id: 3, text: "CGV", url: "#" }
    ]
  },
  technology: {
    pillars: [
      { icon: "⬡", title: "Structure Nanoporeux", desc: "Structure poreuse à l'échelle nanométrique capturant les molécules d'air pour une isolation thermique maximale." },
      { icon: "⬢", title: "Procédé Sol-Gel", desc: "Procédé de fabrication avancé créant une structure en gel d'aérogel avec une précision moléculaire." },
      { icon: "◎", title: "Hydrophobisation", desc: "Traitement de surface rendant l'aérogel résistant à l'humidité tout en préservant ses propriétés isolantes." },
      { icon: "▣", title: "Mise en Forme", desc: "Technologie de moulage permettant de créer des panneaux aux dimensions précises pour diverses applications." }
    ]
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // { type: 'success'|'error', message: string }
  const [localContent, setLocalContent] = useLocalStorage('egapure_content_local', initialContent);

  // Fetch content from static file on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        // Try to fetch from static content file
        const response = await fetch('/data/content.json');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
          setLocalContent(data); // Sync with localStorage as backup
        } else {
          // Fallback to localStorage if file not found
          console.warn('Static content file not found, using localStorage');
          setContent(localContent);
        }
      } catch (error) {
        console.warn('Failed to fetch content from static file:', error);
        // Fallback to localStorage
        setContent(localContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = async (section, data) => {
    try {
      setSaving(true);
      setSaveStatus(null);

      // Update local state immediately for responsive UI
      setContent(prev => ({
        ...prev,
        [section]: data
      }));

      // Try to update via API (GitHub)
      const response = await fetch('/api/content/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, data }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Content updated and committed to GitHub:', result.message);

        // Update localStorage backup
        setContent(current => {
          setLocalContent(current);
          return current;
        });

        setSaveStatus({
          type: 'success',
          message: 'Changes saved and deployed! All visitors will see the updates.'
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSaveStatus(null), 5000);

      } else {
        const errorData = await response.json();
        console.error('Failed to update content via API:', errorData);
        setSaveStatus({
          type: 'error',
          message: `Failed to save changes: ${errorData.error || 'Unknown error'}`
        });
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setSaveStatus({
        type: 'error',
        message: `Failed to save changes: ${error.message}`
      });
    } finally {
      setSaving(false);
    }
  };

  const addActivity = (action) => {
    const activity = {
      timestamp: new Date().toISOString(),
      action: action
    };

    setContent(prev => ({
      ...prev,
      recentActivity: [...(prev.recentActivity || []).slice(-4), activity]
    }));
  };

  const value = {
    content,
    updateContent,
    addActivity,
    recentActivity: content.recentActivity || [],
    loading,
    error,
    saving,
    saveStatus
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
