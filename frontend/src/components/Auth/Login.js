import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate } from 'react-router-dom'; // Używamy useNavigate zamiast history
import API_URL from '../../apiConfig'; // Importujemy API_URL z naszego pliku

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Używamy useNavigate do nawigacji

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token } = response.data;

            // Zapisz token w local storage
            localStorage.setItem('token', token);

            // Przekieruj na stronę zadań
            navigate('/tasks');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Login error. Please try again later.');
            }
            console.error('Login error', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
