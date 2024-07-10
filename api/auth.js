import axios from 'axios';
import API_URL from '../apiConfig';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
