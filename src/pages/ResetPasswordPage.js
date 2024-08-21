import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import texts from '../texts';
import API_URL from '../apiConfig';

function ResetPasswordPage({ language }) {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setError(texts[language].error);
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { newPassword });
            if (response.status === 200) {
                setMessage(texts[language].passwordResetSuccess);
                setTimeout(() => navigate('/'), 3000); // Przekierowanie na stronę logowania
            }
        } catch (error) {
            setError(texts[language].resetPasswordError);
            console.error('Error resetting password', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="intro">
            <div className="main-container intro-content">
                <div className="auth-container">
                    <h2>{texts[language].resetPassword}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder={texts[language].newPassword}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? texts[language].loading : texts[language].resetPassword}
                        </button>
                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;