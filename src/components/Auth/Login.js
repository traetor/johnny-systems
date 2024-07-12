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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(texts[language].error);
            return;
        }

        setLoading(true); // Ustawia stan ładowania na true

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
                if (error.response.status === 429) {
                    setError(texts[language].rateLimitExceeded);
                } else if (error.response.status === 401) {
                    setError(texts[language].invalidCredentials);
                } else if (error.response.status === 403) {
                    setError(texts[language].accountNotActivated);
                } else if (error.response.status === 404) {
                    setError(texts[language].userNotFound);
                } else {
                    setError(texts[language].loginError);
                }
            } else {
                setError(texts[language].loginError);
            }
            console.error('Błąd logowania', error);
        } finally {
            setLoading(false); // Resetuje stan ładowania po zakończeniu requestu
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
                            <h2>{texts[language].loginPage}</h2>
                            <input
                                type="email"
                                placeholder={texts[language].email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading} // Blokuje pole w czasie ładowania
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={texts[language].password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading} // Blokuje pole w czasie ładowania
                                />
                                <button type="button" onClick={toggleShowPassword} disabled={loading}>
                                    {showPassword ? texts[language].hide : texts[language].show}
                                </button>
                            </div>
                            <button className="button primary" type="submit" disabled={loading}>
                                {loading ? texts[language].loading : texts[language].login}
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
