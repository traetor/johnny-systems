import React, { useState } from 'react';
import axios from 'axios';
import './Auth.scss';
import API_URL from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/auth/register`, { username, email, password });
            // Redirect to login page after successful registration
        } catch (error) {
            console.error('Register error', error);
        }
    };

    return (
        <div className="main-container">
            <div className="right-section">
                <div className="auth-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Register</h2>
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
                        <button type="submit">Register</button>
                        <button type="button" onClick={() => navigate('/')}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
