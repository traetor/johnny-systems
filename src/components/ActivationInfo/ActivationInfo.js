import React from 'react';
import texts from "../../texts"
import './ActivationInfo.scss';

function ActivationInfo({ language }) {
    return (
        <div className="activation-info">
            <h2>{texts[language].accountActivation}</h2>
            <p>{texts[language].activationInfoMessage}</p>
        </div>
    );
}

export default ActivationInfo;
