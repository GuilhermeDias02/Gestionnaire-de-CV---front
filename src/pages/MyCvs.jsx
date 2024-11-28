import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCvs, deleteCv} from '../api';

const MyCvs = () => {
  const [cvs, setCvs] = useState([]);
  const [recomms, setRecomms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Utilisateur non connecté. Veuillez vous connecter.');
          return navigate('/login');
        }

        const result = await getMyCvs(token);
        setCvs(result);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des CVs : ' + error.message);
      }
    };

    fetchCvs();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteCv(id, token);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== id));
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression du CV : ' + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-cv/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/cv/${id}`); // Redirige vers la page des détails du CV
  };

  return (
    <div>
      <h1>Mes CV</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {cvs.length > 0 ? (
        <ul>
          {cvs.map((cv) => (
            <li key={cv._id}>
              <h2
                className="cv-title"
                onClick={() => handleViewDetails(cv._id)}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {cv.titre}
              </h2>
              <p>{cv.description}</p>
              <button onClick={() => handleEdit(cv._id)}>Éditer</button>
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

export default MyCvs;
