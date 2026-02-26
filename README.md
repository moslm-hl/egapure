# EGAPURE — Site Web Officiel

Site web professionnel pour EGAPURE, spécialiste de l'isolation biologique à base d'aérogel de silice, avec panneau d'administration CMS intégré.

## Description

EGAPURE propose des solutions d'isolation thermique ultra-performantes et écologiques pour les bâtiments résidentiels et industriels. Nos panneaux isolants à base d'aérogel offrent une conductivité thermique exceptionnelle avec une épaisseur minimale.

## Caractéristiques

- **Site vitrine moderne** avec design responsive
- **Système CMS intégré** pour la gestion de contenu
- **Authentification admin sécurisée**
- **Persistance des données** via localStorage
- **Animations et interactions avancées**
- **Design professionnel** avec charte graphique cohérente

## Technologies Utilisées

- React 18 avec hooks
- Vite pour le développement rapide
- React Router DOM v6 pour la navigation
- Context API pour la gestion d'état
- localStorage pour la persistance
- CSS3 pur (pas de framework CSS)
- JavaScript ES6+

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/USERNAME/egapure-website
cd egapure-website
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse :
```
http://localhost:5173
```

## Accès Admin

### URL d'accès
```
http://localhost:5173/admin/login
```

### Identifiants
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `egapure2025`

### Fonctionnalités du panneau d'administration

- **Tableau de bord** : Vue d'ensemble et activité récente
- **Hero** : Modification du titre, sous-titre et boutons CTA
- **À Propos** : Édition de vision, mission, valeurs et timeline
- **Produits** : Gestion complète des produits et spécifications
- **Statistiques** : Mise à jour des chiffres clés
- **Contact** : Modification des informations de contact
- **Technologie** : Édition des piliers technologiques

Toutes les modifications sont sauvegardées automatiquement et apparaissent immédiatement sur le site public.

## Structure du Projet

```
egapure-website/
├── public/                    # Assets statiques
│   ├── logo.png              # Logo EGAPURE (à ajouter)
│   └── product.png           # Image produit (à ajouter)
├── src/
│   ├── components/           # Composants du site public
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Technology.jsx
│   │   ├── Stats.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── admin/               # Composants admin
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── editors/         # Éditeurs de contenu
│   │       ├── HeroEditor.jsx
│   │       ├── AboutEditor.jsx
│   │       ├── ProductsEditor.jsx
│   │       ├── StatsEditor.jsx
│   │       ├── ContactEditor.jsx
│   │       └── TechnologyEditor.jsx
│   ├── context/             # Context React
│   │   ├── AuthContext.jsx
│   │   └── ContentContext.jsx
│   ├── hooks/               # Hooks personnalisés
│   │   └── useLocalStorage.js
│   ├── App.jsx              # Composant principal
│   ├── App.css             # Styles globaux
│   └── main.jsx             # Point d'entrée
├── index.html               # Template HTML
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
└── README.md               # Documentation
```

## Ajout du Logo et des Images

Pour une expérience optimale, ajoutez les fichiers suivants dans le dossier `public/` :

1. **logo.png** : Logo EGAPURE (dimensions recommandées : 200x80px)
2. **product.png** : Image de produit pour la bannière (dimensions recommandées : 800x400px)

Les images manquantes seront remplacées par des placeholders élégants.

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée la version de production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Exécute le linter ESLint

## Build de Production

Pour créer une version optimisée du site :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## Personnalisation

### Couleurs du Thème

Les couleurs principales sont définies dans `src/App.css` :

- **Vert principal** : `#4A7C3F`
- **Brun accent** : `#8B6343`
- **Foncé** : `#0A0A0A`
- **Texte clair** : `#F0F0F0`
- **Gris subtil** : `#2A2A2A`

### Contenu par Défaut

Le contenu initial est défini dans `src/context/ContentContext.jsx`. Vous pouvez modifier les valeurs par défaut directement dans ce fichier.

## Déploiement

Le site est prêt pour le déploiement sur toute plateforme statique :

- Netlify
- Vercel
- GitHub Pages
- Serveur web traditionnel

Assurez-vous de configurer les redirections pour que toutes les routes pointent vers `index.html` (SPA routing).

## Support

Pour toute question ou problème :

1. Vérifiez la console du navigateur pour les erreurs
2. Assurez-vous que toutes les dépendances sont installées
3. Consultez la documentation React et Vite pour des problèmes spécifiques

## License

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**EGAPURE** - L'isolation du futur, aujourd'hui.
