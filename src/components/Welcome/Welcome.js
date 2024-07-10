import React from 'react';
import './Welcome.scss';
import texts from "../../texts";

function Welcome({ language }) {
    return (
        <div className="welcome left-section">
            <h2>{texts[language].welcome}</h2>
            <h3>{texts[language].welcomeDescription}</h3>
        </div>
    );
}

export default Welcome;
