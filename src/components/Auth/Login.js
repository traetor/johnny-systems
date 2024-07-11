import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { useAuth } from '../../contexts/AuthContext';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";
import "./Password.scss";

function Login({ language }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(texts[language].error);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                login(token);
                navigate('/tasks');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError(texts[language].invalidCredentials);
                } else if (error.response.status === 403) {
                    setError(texts[language].accountNotActivated); // Komunikat o nieaktywowanym koncie
                } else if (error.response.status === 404) {
                    setError(texts[language].userNotFound);
                } else {
                    setError(texts[language].loginError);
                }
            } else {
                setError(texts[language].loginError);
            }
            console.error('Błąd logowania', error);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <Welcome language={language} />
                <div className="right-section">
                    <div className="auth-container">
                        <form onSubmit={handleSubmit}>
                            <h2>{texts[language].login}</h2>
                            <input
                                type="email"
                                placeholder={texts[language].email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={texts[language].password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={toggleShowPassword}>
                                    {showPassword ? 'Ukryj' : 'Pokaż'}
                                </button>
                            </div>
                            <button className="button primary" type="submit">{texts[language].login}</button>
                            <button className="button primary" type="button" onClick={() => navigate('/register')}>
                                {texts[language].register}
                            </button>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
