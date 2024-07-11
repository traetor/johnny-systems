import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import API_URL from '../../apiConfig';
import ActivationInfo from '../ActivationInfo/ActivationInfo';
import { useNavigate } from 'react-router-dom';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";

function Register({ language }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja pól formularza
        if (!username || !email || !password || !confirmPassword) {
            setError(texts[language].fillAllFields || 'Please fill in all form fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(texts[language].validEmail || 'Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setError(texts[language].passwordLength || 'Password should be at least 8 characters long');
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError(texts[language].passwordSpecialChars || 'Password should contain at least one special character');
            return;
        }

        if (password !== confirmPassword) {
            setError(texts[language].passwordMismatch || 'Password confirmation does not match');
            return;
        }

        try {
            // Sprawdzenie unikalności adresu email
            const checkEmailResponse = await axios.get(`${API_URL}/auth/check-email/${email}`);
            if (!checkEmailResponse.data.available) {
                setError(texts[language].emailExists || 'This email is already registered');
                return;
            }

            // Jeśli email jest unikalny, wykonaj rejestrację
            await axios.post(`${API_URL}/auth/register`, { username, email, password, language });
            setRegistered(true);
        } catch (error) {
            console.error('Registration error:', error);
            setError(texts[language].registrationError || 'Error during registration. Please try again later.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                                    type="email"
                                    placeholder={texts[language].email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder={texts[language].username}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="password-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={texts[language].password}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button type="button" onClick={toggleShowPassword}>
                                        {showPassword ? texts[language].hide : texts[language].show}
                                    </button>
                                </div>
                                <div className="password-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder={texts[language].confirmPassword}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button type="button" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? texts[language].hide : texts[language].show}
                                    </button>
                                </div>
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
