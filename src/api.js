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

export const getCurrentUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user/connected/token`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du user connecté:', error.response?.data || error.message);
        throw error.response?.data || error.message;
      }
}

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

export const getRecommByCv = async (cvId, token) => {
  try {
    const response = await axios.get(`${API_URL}/recommendation/cv/${cvId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche des recommendations:', error);
    throw error;
  }
};

export const getRecommById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/recommendation/recomm/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de la récupération de la recommandation:", error);
        throw error;
    }
}

export const deleteRecomm = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/recomm/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Retourne le message de confirmation
      } catch (error) {
        console.error('Erreur lors de la suppression de la recommendation :', error);
        throw error;
      }
  };

export const createRecomm = async (recommData, token) => {
    try {
        const response = await axios.post(`${API_URL}/recomm`, recommData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error creating Recommendation:', error.response?.data || error.message);
        throw error.response?.data || error.message;
      }
  };

