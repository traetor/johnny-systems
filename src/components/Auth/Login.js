import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token } = response.data;

            // Save token to local storage
            localStorage.setItem('token', token);

            // Update authentication state
            login(token); // Assuming this method updates isLoggedIn state in AuthContext

            // Redirect to tasks page
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
        <div className="main-container">
            <div className="right-section">
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
                        <button type="submit">Log in</button>
                        <button type="button" onClick={() => navigate('/register')}>
                            Register
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
