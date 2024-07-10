// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext'; // Importujemy kontekst autoryzacji
import PrivateRoute from './components/PrivateRoute'; // Importujemy komponent PrivateRoute

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
