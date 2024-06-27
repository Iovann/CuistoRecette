import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/home';
import Inscription from './pages/inscription';
import Connexion from './pages/connexion';
import NotFound from './pages/not_found';
import Acceuil from './pages/Acceuil';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import Recipe from './pages/Recipe';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/recette" element={<Recipe />} />

          <Route path="/user" element={<ProtectedRoute element={Acceuil} />} />
          <Route path="/user/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/user/add" element={<ProtectedRoute element={CreateRecipe} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;