import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from './pages/ProfilePage';
import ActivatePage from './pages/ActivatePage'; // Import ActivatePage
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import texts from './texts';
import './App.scss';

const saveLanguageToLocalStorage = (language) => {
    localStorage.setItem('language', language);
};

const getLanguageFromLocalStorage = () => {
    return localStorage.getItem('language');
};

const getDefaultLanguage = () => {
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['pl', 'en', 'de'];

    return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
};

function App() {
    const [language, setLanguage] = useState(getLanguageFromLocalStorage() || getDefaultLanguage());

    useEffect(() => {
        saveLanguageToLocalStorage(language);
    }, [language]);

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
                <Route path="/activate/:token" element={<ActivatePage language={language} />} /> {/* Nowa trasa */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
