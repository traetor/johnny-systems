import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from './pages/ProfilePage';
import Welcome from './components/Welcome/Welcome'; // Import Welcome
import { AuthProvider } from './contexts/AuthContext'; // Importujemy kontekst autoryzacji
import PrivateRoute from './components/PrivateRoute'; // Importujemy komponent PrivateRoute
import texts from './texts'; // Importujemy tłumaczenia
import './App.scss'

function App() {
    const [language, setLanguage] = useState('pl'); // Domyślny język: polski

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <AuthProvider>
            <Navbar language={language} handleLanguageChange={handleLanguageChange} />
            <Routes>
                <Route path="/" element={<LoginPage language={language} />} />
                <Route path="/register" element={<RegisterPage language={language} />} />
                <Route path="/tasks" element={<TaskPage language={language} />} />
                <Route path="/profile" element={<ProfilePage language={language} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
