import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CreateEditCv from './pages/CreateEditCv'; 
import MyCVs from './pages/MyCvs';
import CvDetails from "./pages/CvDetails";
import { searchCvs } from './api';
import Layout from './components/Layout';
import CreateEditRecomm from './pages/CreateEditRecomm';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();

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
      navigate(`/cv/${cvId}`); // Redirige vers les détails si connecté
    } else {
      navigate("/login"); // Redirige vers la connexion si non connecté
    }
  };

  return (
    <div>
      <h1>Bienvenue sur la plateforme de CV</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/login" style={{ marginRight: '10px', color: 'blue', textDecoration: 'underline' }}>
          Se connecter
        </Link>
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          S inscrire
        </Link>
      </div>
      <div>
        <h2>Recherche de CV</h2>
        <input
          type="text"
          placeholder="Rechercher un CV par titre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Rechercher
        </button>
      </div>
      <ul style={{ marginTop: '20px' }}>
        {cvs.map((cv) => (
          <li key={cv._id} style={{ marginBottom: '15px' }}>
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

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/create-cv" element={<CreateEditCv />} />
              <Route path="/my-cvs" element={<MyCVs />} />
              <Route path="/cv/:id" element={<CvDetails />} />
              <Route path="/edit-cv/:id" element={<CreateEditCv isEdit />} />
              <Route path="/create-recomm" element={<CreateEditRecomm/>} />
              {/* <Route path="/edit-recomm" element={<CreateEditRecomm true/>} /> */}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
