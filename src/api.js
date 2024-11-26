import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fonction pour créer un utilisateur
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw error;
  }
};

