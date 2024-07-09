import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';
import API_URL from '../../apiConfig'; // Importujemy API_URL z naszego pliku

function Profile() {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);

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
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('username', user.username);
        formData.append('email', user.email);

        try {
            await axios.put(`${API_URL}/users/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Zaktualizuj profil użytkownika po pomyślnej aktualizacji
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <div className="profile-container">
            <form onSubmit={handleProfileUpdate}>
                <h2>Profile</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input type="file" onChange={handleAvatarChange} />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;
