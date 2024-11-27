import { useNavigate } from 'react-router-dom';

const DashboardButton = () => {
  const navigate = useNavigate();

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 1000, // Pour être visible au-dessus de tout
      }}
      onClick={() => navigate('/dashboard')}
    >
      Aller au Dashboard
    </button>
  );
};

export default DashboardButton;
