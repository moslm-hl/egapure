import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';

// Public website components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Technology from './components/Technology';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import HeroEditor from './admin/editors/HeroEditor';
import AboutEditor from './admin/editors/AboutEditor';
import ProductsEditor from './admin/editors/ProductsEditor';
import StatsEditor from './admin/editors/StatsEditor';
import ContactEditor from './admin/editors/ContactEditor';
import TechnologyEditor from './admin/editors/TechnologyEditor';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Public website - all sections on one page
const PublicWebsite = () => (
  <div className="ega-app">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Products />
      <Technology />
      <Stats />
      <Contact />
    </main>
    <Footer />
  </div>
);

// Admin routes with protection
const AdminRoutes = () => (
  <ProtectedRoute>
    <AdminLayout>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hero" element={<HeroEditor />} />
        <Route path="/admin/about" element={<AboutEditor />} />
        <Route path="/admin/products" element={<ProductsEditor />} />
        <Route path="/admin/stats" element={<StatsEditor />} />
        <Route path="/admin/contact" element={<ContactEditor />} />
        <Route path="/admin/technology" element={<TechnologyEditor />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicWebsite />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
