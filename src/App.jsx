import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import CreateEditCv from './CreateEditCv'; 
import MyCVs from './MyCvs';
import CvDetails from "./CvDetails";

const Home = () => {
  return (
    <div>
      <h1>Bienvenue</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
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
      <Route path="/create-cv" element={<CreateEditCv />} />
      <Route path="/my-cvs" element={<MyCVs />} />
      <Route path="/cv/:id" element={<CvDetails />} />
      <Route path="/edit-cv/:id" element={<CreateEditCv isEdit={true} />} />
    </Routes>
  </Router>
);

export default App;
