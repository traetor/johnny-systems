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
                setTimeout(() => {
                    navigate('/');
                }, 3000); // Przekierowanie po 3 sekundach
            } catch (error) {
                setMessage('Activation failed. Please try again later.');
            }
        };

        activateAccount();
    }, [token, navigate]);

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <h2>{texts[language].accountActivation}</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ActivatePage;
