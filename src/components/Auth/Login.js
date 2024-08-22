import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { useAuth } from '../../contexts/AuthContext';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";
import "./Password.scss";
import ReCAPTCHA from 'react-google-recaptcha';

function Login({ language }) {
    const { login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLinkVisible, setResendLinkVisible] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Usuń sesję przy wejściu na stronę logowania
        logout();
    }, [logout]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !captchaValue) {
            setError(texts[language].error);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password, captcha: captchaValue });

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

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
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
                            <ReCAPTCHA
                                sitekey="6LeD1SwqAAAAAAsO7N045EX3Vn37tFpSBJt_tfVK" // Wstaw swój klucz publiczny reCAPTCHA
                                onChange={onCaptchaChange}
                                size="normal"
                            />
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