import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import texts from '../../texts';
import './Navbar.scss';

function Navbar({ language, handleLanguageChange }) {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar">
            {isLoggedIn ? (
                <>
                    <Link to="/tasks">{texts[language].tasks}</Link>
                    <Link to="/profile">{texts[language].profile}</Link>
                    <Link to="/" onClick={logout}>{texts[language].logout}</Link>
                </>
            ) : (
                <></>
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
