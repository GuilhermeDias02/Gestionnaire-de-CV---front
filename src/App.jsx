import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './CreateUser';

const Home = () => {
  return (
    <div>
      <h1>Bienvenue sur la page d accueil</h1>
      <p>Cliquez sur Créer un utilisateur pour commencer.</p>
      <Link to="/create-user">
        <button>Créer un utilisateur</button>
      </Link>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
    </Routes>
  </Router>
);

export default App;
