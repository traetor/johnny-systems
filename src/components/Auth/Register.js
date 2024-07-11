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

        if (!username || !email || !password || !confirmPassword) {
            setError('Proszę wypełnić wszystkie pola formularza');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Proszę podać poprawny adres email');
            return;
        }

        if (password.length < 8) {
            setError('Hasło powinno mieć co najmniej 8 znaków');
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError('Hasło powinno zawierać co najmniej jeden znak specjalny');
            return;
        }

        if (password !== confirmPassword) {
            setError('Potwierdzenie hasła nie pasuje do hasła');
            return;
        }

        try {
            await axios.post(`${API_URL}/auth/register`, { username, email, password });
            setRegistered(true);
        } catch (error) {
            console.error('Błąd rejestracji', error);
            setError('Błąd podczas rejestracji. Proszę spróbować ponownie później.');
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
                                    type="text"
                                    placeholder={texts[language].username}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
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
                                <div className="password-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder={texts[language].confirmPassword}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button type="button" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? 'Ukryj' : 'Pokaż'}
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
