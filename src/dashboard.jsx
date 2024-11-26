import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateCv = () => {
    navigate('/create-cv'); // Redirige vers la page de création de CV
  };

  const handleViewCvs = () => {
    navigate('/my-cvs'); // Redirige vers la page de consultation des CVs
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue sur votre tableau de bord</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleCreateCv}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Créer un CV
        </button>
        <button
          onClick={handleViewCvs}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Mes CV
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
