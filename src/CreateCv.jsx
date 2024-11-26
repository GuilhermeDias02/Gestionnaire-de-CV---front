import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCv } from './api'; // Import de la fonction API

const CreateCv = () => {
  const [cvData, setCvData] = useState({
    titre: '',
    adresse: '',
    description: '',
    techSkills: '',
    softSkills: '',
    certifications: '',
    expPro: '',
    visible: true,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        setMessage('Utilisateur non connecté. Veuillez vous connecter.');
        navigate('/login');
        return;
      }

      await createCv(cvData, token); // Appel API pour créer le CV
      setMessage('CV créé avec succès !');

      // Réinitialiser le formulaire après succès
      setCvData({
        titre: '',
        adresse: '',
        description: '',
        techSkills: '',
        softSkills: '',
        certifications: '',
        expPro: '',
        visible: true,
      });

      setTimeout(() => navigate('/my-cvs'), 2000);
    } catch (error) {
      setMessage(error.error || 'Erreur lors de la création du CV.');
    }
  };

  return (
    <div>
      <h1>Créer un CV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={cvData.titre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={cvData.adresse}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={cvData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="techSkills"
          placeholder="Compétences techniques"
          value={cvData.techSkills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="softSkills"
          placeholder="Compétences générales"
          value={cvData.softSkills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications"
          value={cvData.certifications}
          onChange={handleChange}
        />
        <textarea
          name="expPro"
          placeholder="Expérience professionnelle"
          value={cvData.expPro}
          onChange={handleChange}
        />
        <label>
          Visible :
          <input
            type="checkbox"
            name="visible"
            checked={cvData.visible}
            onChange={(e) => setCvData({ ...cvData, visible: e.target.checked })}
          />
        </label>
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateCv;
