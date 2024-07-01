import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Profile from './Profil';
import Login from './Login'; // Importer le composant Login

const isAuthenticated = () => {
  // Remplacez cette logique par votre vérification réelle de l'authentification
  // Par exemple, vérifier un token dans le localStorage
  return !!localStorage.getItem('user');
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isAuthenticated() ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
