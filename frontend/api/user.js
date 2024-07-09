import axios from 'axios';
import API_URL from '../apiConfig';

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}/users/profile`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
