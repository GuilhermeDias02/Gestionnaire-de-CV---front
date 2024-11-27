import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCvs } from '../api';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async () => {
    try {
      const results = await searchCvs(searchTerm);
      setCvs(results);
    } catch (error) {
      console.error("Erreur lors de la recherche des CVs :", error);
    }
  };

  const handleViewDetails = (cvId) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/cv/${cvId}`); 
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Tableau de bord</h1>
      <div style={{ marginBottom: '20px' }}>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Déconnexion
      </button>
        <button
          onClick={() => navigate("/create-cv")}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Créer un CV
        </button>
        <button
          onClick={() => navigate("/my-cvs")}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Mes CVs
        </button>
      </div>
      <div>
        <h2>Recherche de CV</h2>
        <input
          type="text"
          placeholder="Rechercher un CV par titre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '60%',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Rechercher
        </button>
      </div>
      <ul style={{ marginTop: '20px', listStyleType: 'none', padding: 0 }}>
        {cvs.map((cv) => (
          <li
            key={cv._id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              onClick={() => handleViewDetails(cv._id)}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              {cv.titre}
            </h3>
            <p>{cv.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
