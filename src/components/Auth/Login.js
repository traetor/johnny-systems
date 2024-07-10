import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { useAuth } from '../../contexts/AuthContext';
import Welcome from "../Welcome/Welcome";
import texts from "../../texts";

function Login({ language }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja pól formularza
        if (!email || !password) {
            setError('Proszę wypełnić wszystkie pola');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token } = response.data;

            // Zapisz token w localStorage
            localStorage.setItem('token', token);

            // Zaktualizuj stan autoryzacji
            login(token); // Zakładając, że ta metoda aktualizuje stan isLoggedIn w AuthContext

            // Przekieruj na stronę zadan
            navigate('/tasks');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(texts[language].invalidCredentials); // Ustawienie odpowiedniego błędu na podstawie języka
            } else {
                setError(texts[language].loginError); // Ustawienie ogólnego błędu logowania
            }
            console.error('Błąd logowania', error);
        }
    };

    return (
        <div className="main-container intro">
            <Welcome language={language} /> {/* Przekazanie języka do komponentu Welcome */}
            <div className="right-section">
                <div className="auth-container">
                    <form onSubmit={handleSubmit}>
                        <h2>{texts[language].login}</h2>
                        <input
                            type="email"
                            placeholder={'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder={'Password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="button primary" type="submit">{texts[language].login}</button>
                        <button className="button primary" type="button" onClick={() => navigate('/register')}>
                            {texts[language].register}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
