import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fonction pour créer un utilisateur
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error register:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error login:', error.response?.data || error.message);
    throw error;
  }
};

export const createCv = async (cvData, token) => {
  try {
    const response = await axios.post(`${API_URL}/cv`, cvData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating CV:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getCVs = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cv`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des CVs :', error);
    throw error;
  }
};

export const deleteCV = async (cvId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/cv/${cvId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Retourne le message de confirmation
  } catch (error) {
    console.error('Erreur lors de la suppression du CV :', error);
    throw error;
  }
};

export const getCvById = async (id, token) => {
  try {
      const response = await axios.get(`${API_URL}/cv/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data; // Retourne les données du CV
  } catch (error) {
      console.error("Erreur lors de la récupération du CV :", error);
      throw error;
  }
};