import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { useAuth } from '../../contexts/AuthContext';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";
import "./Password.scss";

function Login({ language }) {
    const { login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLinkVisible, setResendLinkVisible] = useState(false);
    const [captchaToken, setCaptchaToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Usuń sesję przy wejściu na stronę logowania
        logout();

        // Załaduj skrypt reCAPTCHA
        const loadRecaptchaScript = () => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=6LeD1SwqAAAAAAsO7N045EX3Vn37tFpSBJt_tfVK`; // Zamień YOUR_SITE_KEY na swój klucz publiczny
            script.async = true;
            script.onload = () => {
                if (window.grecaptcha) {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha.execute();
                    });
                }
            };
            document.body.appendChild(script);
        };

        loadRecaptchaScript();
    }, [logout]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !captchaToken) {
            setError(texts[language].error);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password, captcha: captchaToken });

            if (response.status === 200) {
                const { token } = response.data;
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
                    setResendLinkVisible(true);
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
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRecaptcha = () => {
        if (window.grecaptcha) {
            window.grecaptcha.execute().then((token) => {
                setCaptchaToken(token);
            });
        }
    };

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <Welcome language={language} />
                <div className="right-section">
                    <div className="auth-container">
                        <form onSubmit={(e) => { handleRecaptcha(); handleSubmit(e); }}>
                            <h2>{texts[language].loginPage}</h2>
                            <input
                                type="email"
                                placeholder={texts[language].email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={texts[language].password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <button type="button" onClick={toggleShowPassword} disabled={loading}>
                                    {showPassword ? texts[language].hide : texts[language].show}
                                </button>
                            </div>
                            <button className="button primary" type="submit" disabled={loading}>
                                {loading ? texts[language].loading : texts[language].login}
                            </button>
                            {error && <div className="error-message" dangerouslySetInnerHTML={{ __html: error }} />}
                            <div className="forgot-password-link">
                                <Link to="/forgot-password">{texts[language].forgotPassword}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;