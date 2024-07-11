import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import API_URL from '../../apiConfig';
import ActivationInfo from '../ActivationInfo/ActivationInfo'; // Import ActivationInfo
import { useNavigate } from 'react-router-dom';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";

function Register({ language }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false); // State to manage registration status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prosta walidacja
        if (!username || !email || !password) {
            setError('Proszę wypełnić wszystkie pola formularza');
            return;
        }

        // Walidacja adresu email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Proszę podać poprawny adres email');
            return;
        }

        try {
            await axios.post(`${API_URL}/auth/register`, { username, email, password });
            setRegistered(true); // Set registration status to true on successful registration
        } catch (error) {
            console.error('Register error', error);
            setError('Błąd podczas rejestracji. Proszę spróbować ponownie później.');
        }
    };

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <Welcome language={language} />
                <div className="right-section">
                    <div className="auth-container">
                        {registered ? (
                            <ActivationInfo language={language} />
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h2>{texts[language].register}</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="button primary" type="submit">{texts[language].register}</button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                        )}
                        <button className="button primary" type="button" onClick={() => navigate('/')}>
                            {texts[language].login}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;