import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api'; // Import de la fonction login depuis api.js

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData);
      setMessage('Connexion réussie ! Redirection vers la page principale...');
      // Stocker le token dans le localStorage ou dans un contexte global
      localStorage.setItem('token', result.token);
      setTimeout(() => navigate('/dashboard'), 2000); // Redirection vers /dashboard après 2 secondes
    } catch (error) {
      setMessage(error.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
