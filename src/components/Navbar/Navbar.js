import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import texts from '../../texts';
import './Navbar.scss';

function Navbar({ language, handleLanguageChange }) {
    const { isLoggedIn, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className="navbar-container">
                <div className="nav-links">
                    {isLoggedIn && (
                        <>
                            <Link to="/tasks">{texts[language].tasks}</Link>
                            <Link to="/profile">{texts[language].profile}</Link>
                            <Link className="logout" to="/" onClick={logout}>{texts[language].logout}</Link>
                        </>
                    )}
                </div>
                <div className="nav-language-select">
                    <select value={language} onChange={handleLanguageChange}>
                        <option value="pl">Polski</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                    </select>
                </div>
                {isLoggedIn && (
                    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <div className="hamburger"></div>
                    </div>
                )}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-links">
                        {isLoggedIn && (
                            <>
                                <Link to="/tasks" onClick={toggleMobileMenu}>{texts[language].tasks}</Link>
                                <Link to="/profile" onClick={toggleMobileMenu}>{texts[language].profile}</Link>
                                <Link to="/" onClick={() => { logout(); toggleMobileMenu(); }}>{texts[language].logout}</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
