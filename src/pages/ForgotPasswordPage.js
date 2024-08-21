import React, { useState } from 'react';
import axios from 'axios';
import texts from '../texts';
import API_URL from '../apiConfig';

function ForgotPasswordPage({ language }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError(texts[language].error);
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
            if (response.status === 200) {
                setMessage(texts[language].resetLinkSent);
            }
        } catch (error) {
            setError(texts[language].resetLinkError);
            console.error('Error sending reset password email', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <div className="auth-container">
                    <h2>{texts[language].forgotPassword}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder={texts[language].email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? texts[language].loading : texts[language].sendResetLink}
                        </button>
                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;