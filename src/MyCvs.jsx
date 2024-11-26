import { useEffect, useState } from 'react';
import { getCVs, deleteCV } from './api';
import { Link } from "react-router-dom";

const MyCVs = () => {
  const [cvs, setCvs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Non autorisé. Veuillez vous connecter.');
          return;
        }

        const response = await getCVs(token);
        setCvs(response);
      } catch (error) {
        setMessage('Erreur lors de la récupération des CV.');
        console.error(error);
      }
    };

    fetchCVs();
  }, []);

  // Supprimer un CV
  const handleDelete = async (cvId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Non autorisé. Veuillez vous connecter.');
        return;
      }

      await deleteCV(cvId, token); // Appel API pour supprimer le CV
      setMessage('CV supprimé avec succès.');
      setCvs(cvs.filter((cv) => cv._id !== cvId)); // Mise à jour de la liste des CVs
    } catch (error) {
      setMessage('Erreur lors de la suppression du CV.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mes CV</h1>
      {message && <p>{message}</p>}
      {cvs.length > 0 ? (
        <ul>
          {cvs.map((cv) => (
            <li key={cv._id}>
              <Link to={`/cv/${cv._id}`}>{cv.titre}</Link>
              <button onClick={() => handleDelete(cv._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun CV disponible.</p>
      )}
    </div>
  );
};

export default MyCVs;
