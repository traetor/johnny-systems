// components/Footer/Footer.js
import React from 'react';
import './Footer.scss';
// import logo from '../../assets/logo.svg'; // Miejsce na plik z logiem svg

function Footer({ language }) {
    const year = new Date().getFullYear();

    const texts = {
        pl: {
            copyright: `© ${year} Johnny Systems. Wszelkie prawa zastrzeżone.`,
        },
        en: {
            copyright: `© ${year} Johnny Systems. All rights reserved.`,
        },
        de: {
            copyright: `© ${year} Johnny Systems. Alle Rechte vorbehalten.`,
        },
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                {/*<img src={logo} alt="Logo" className="footer-logo" />*/}
                <p>{texts[language].copyright}</p>
            </div>
        </footer>
    );
}

export default Footer;
