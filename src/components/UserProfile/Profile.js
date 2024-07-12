import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';
import API_URL from '../../apiConfig';
import texts from "../../texts";

function Profile({language}) {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, []);

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true); // Ustawia stan ładowania na true
        setSuccessMessage(''); // Czyści poprzedni komunikat sukcesu

        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('username', user.username);

        try {
            const response = await axios.put(`${API_URL}/users/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUser(response.data);
            setSuccessMessage(texts[language].profileUpdated); // Ustawia komunikat o sukcesie
        } catch (error) {
            console.error('Error updating profile', error);
        } finally {
            setLoading(false); // Resetuje stan ładowania po zakończeniu requestu
        }
    };

    return (
        <div className="intro">
            <div className="intro-content container">
                <div className="profile-container">
                    <form onSubmit={handleProfileUpdate}>
                        <h2>{texts[language].userProfile}</h2>
                        {user.avatar && (
                            <img src={user.avatar} alt="Avatar" className="avatar-preview"/>
                        )}
                        <input
                            type="text"
                            placeholder={texts[language].username}
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            disabled={loading} // Blokuje pole w czasie ładowania
                        />
                        <input
                            className="email"
                            type="email"
                            placeholder={texts[language].email}
                            value={user.email}
                            readOnly // Email jest tylko do odczytu
                        />
                        {/*<input type="file" onChange={handleAvatarChange} disabled={loading}/>*/}
                        <button className="button primary" type="submit" disabled={loading}>
                            {loading ? texts[language].loading : texts[language].update}
                        </button>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
