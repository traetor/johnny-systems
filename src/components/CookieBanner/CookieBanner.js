import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import texts from '../../texts'; // Upewnij się, że ścieżka do pliku jest poprawna
import './CookieBanner.scss'; // Upewnij się, że masz odpowiedni plik CSS

const CookieBanner = ({ language }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = Cookie.get('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        Cookie.set('cookieConsent', 'true', { expires: 365 }); // Cookie expires in 365 days
        setIsVisible(false);
    };

    const t = texts[language]?.cookieBanner;

    if (!isVisible || !t) return null;

    return (
        <div className="cookie-banner">
            <p dangerouslySetInnerHTML={{ __html: t.message }} />
            <button onClick={handleAcceptCookies}>{t.accept}</button>
        </div>
    );
};

export default CookieBanner;