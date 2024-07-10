import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import texts from '../../texts';
import './Navbar.scss';

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const [language, setLanguage] = useState('pl'); // Default language: Polish

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <nav className="navbar">
            <Link to="/tasks">{texts[language].tasks}</Link>
            <Link to="/profile">{texts[language].profile}</Link>
            {isLoggedIn ? (
                <Link to="/" onClick={logout}>{texts[language].logout}</Link>
            ) : (
                <Link to="/register">{texts[language].register}</Link>
            )}
            <select value={language} onChange={handleLanguageChange}>
                <option value="pl">Polski</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>
        </nav>
    );
}

export default Navbar;
