import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import { createUser } from './api';

const CreateUser = () => {
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialisation du hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      setMessage(result.message);

      // Réinitialise le formulaire
      setFormData({ nom: '', prenom: '', email: '', password: '' });

      // Redirige vers la page de connexion après un délai
      setTimeout(() => navigate('/login'), 2000); // Redirection après 2 secondes
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erreur lors de la création de l\'utilisateur');
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">S inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
