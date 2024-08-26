import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from './pages/ProfilePage';
import ActivatePage from './pages/ActivatePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NoteListPage from './pages/NoteListPage';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'; // Import GoogleReCaptchaProvider
import CookieBanner from './components/CookieBanner/CookieBanner'; // Import CookieBanner
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
            <GoogleReCaptchaProvider reCaptchaKey="6LeD1SwqAAAAAAsO7N045EX3Vn37tFpSBJt_tfVK">
                <div className="app-container">
                    <Navbar language={language} handleLanguageChange={handleLanguageChange} />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<LoginPage language={language} />} />
                        <Route path="/register" element={<RegisterPage language={language} />} />
                        <Route path="/tasks" element={<PrivateRoute><TaskPage language={language} /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><ProfilePage language={language} /></PrivateRoute>} />
                        <Route path="/activate/:token" element={<ActivatePage language={language} />} />
                        <Route path="/notes" element={<PrivateRoute><NoteListPage language={language} /></PrivateRoute>} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage language={language} />} />
                        <Route path="/reset-password/:token" element={<ResetPasswordPage language={language} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Footer language={language} />
                    <CookieBanner language={language} /> {/* Add CookieBanner here */}
                </div>
            </GoogleReCaptchaProvider>
        </AuthProvider>
    );
}

export default App;