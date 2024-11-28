import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Récupérer les recommandations pour un CV
export const getRecommendations = async (cvId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/recommendation/${cvId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations :", error);
    throw error;
  }
};

// Créer une nouvelle recommandation
export const createRecommendation = async (cvId, message, rating) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/recommendation`,
      {
        cv: cvId,
        message: message,
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la recommandation :", error);
    throw error;
  }
};


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

export const getMyCvs = async (token) => {
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

export const deleteCv = async (cvId, token) => {
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
      const response = await axios.get(`${API_URL}/cv/one/${id}`, {
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

export const updateCv = async (cvId,cvData, token) => {
  try {
    const response = await axios.put(`${API_URL}/cv/${cvId}`, cvData, {
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

export const searchCvs = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/cv/search/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche des CVs :', error);
    throw error;
  }
};

