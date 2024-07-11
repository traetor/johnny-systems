import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../apiConfig';
import texts from '../texts';

function ActivatePage({ language }) {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth/activate/${token}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(texts[language].activationErrorMessage); // Ustawienie komunikatu błędu z tekstów
            }
        };

        activateAccount();
    }, [token, navigate, language]);

    return (
        <div className="intro">
            <div className="main-container intro-content activate">
                <h2>{texts[language].accountActivation}</h2>
                <p>{message}</p>
                <button className="button primary" type="button" onClick={() => navigate('/')}>
                    {texts[language].login}
                </button>
            </div>
        </div>
    );
}

export default ActivatePage;
