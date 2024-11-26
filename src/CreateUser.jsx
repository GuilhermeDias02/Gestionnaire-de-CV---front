import { useState } from 'react';
import { createUser } from './api';

const CreateUser = () => {
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      setMessage(result.message);
      setFormData({ nom: '', prenom: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error creating user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nom"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom"
        required
        />
        <input
        type="text"
        name="prenom" 
        value={formData.prenom || ''}
        onChange={handleChange}
        placeholder="Prenom"
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
          placeholder="Password"
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
