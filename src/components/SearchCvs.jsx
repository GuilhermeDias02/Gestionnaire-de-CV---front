import { useState } from "react";
import { searchCvs } from "../api";

const SearchCvs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchCvs(searchTerm);
      setResults(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erreur lors de la recherche des CVs.", error);
    }
  };

  return (
    <div>
      <h1>Rechercher des CV</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher par titre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((cv) => (
            <li key={cv._id}>
              <h2>{cv.titre}</h2>
              <p>{cv.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default SearchCvs;
