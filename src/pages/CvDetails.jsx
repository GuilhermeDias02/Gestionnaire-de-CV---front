import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvById, getRecommByCv, getCurrentUser, deleteRecomm } from "../api";
import { useNavigate } from 'react-router-dom';

const CvDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [message, setMessage] = useState("");
    const [recomms, setRecomms] = useState([]);
    const [messageRecomms, setMessageRecomms] = useState("");
    const [user, setUser] = useState(null);
    // const [messageUser, setMessageUser] = useState("");

    const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem('token');
          await deleteRecomm(id, token);
        } catch (error) {
          setMessageRecomms('Erreur lors de la suppression de la recommendation: ' + error.message);
        }
      };

    useEffect(() => {
        const fetchCvDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const cvData = await getCvById(id, token);
                setCv(cvData);
            } catch (error) {
                setMessage("Erreur lors de la récupération du CV.", error);
            }
        };
        const fetchRecomms = async () => {
            try {
                const token = localStorage.getItem("token");
                const recommData = await getRecommByCv(id, token);
                setRecomms(recommData);
            } catch (error) {
                setMessageRecomms("Erreur lors de la récupération des recomms" + error);
            }
        }
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const userData = await getCurrentUser(token);
                setUser(userData);
            } catch (error) {
                console.log("Erreur lors de la récupération de l'utilisateur connecté" + error)
                // setMessageUser("Erreur lors de la récupération de l'utilisateur connecté" + error);
            }
        }

        fetchCvDetails();
        fetchRecomms();
        fetchCurrentUser();
    }, [id]);

    if (!cv) {
        return <p>Chargement des détails...</p>;
    }

    return (
        <div>
            <h1>CV</h1>
            {message && <p>{message}</p>}
            {cv && (
                <div>
                    <h2>{cv.titre}</h2>
                    <p><strong>Nom :</strong> {cv.nom}</p>
                    <p><strong>Prénom :</strong> {cv.prenom}</p>
                    <p><strong>Adresse :</strong> {cv.adresse}</p>
                    <p><strong>Description :</strong> {cv.description}</p>
                    <p><strong>Compétences techniques :</strong> {cv.techSkills?.join(", ") || "Aucune compétence technique."}</p>
                    <p><strong>Compétences générales :</strong> {cv.softSkills?.join(", ") || "Aucune compétence générale."}</p>
                    <p><strong>Certifications :</strong> {cv.certifications?.join(", ") || "Aucune certification."}</p>
                    <p><strong>Expériences professionnelles :</strong></p>
                    <ul>
                        {cv.expPro?.length > 0 ? (
                            cv.expPro.map((exp, index) => (
                                <li key={index}>
                                    <p><strong>Entreprise :</strong> {exp.entreprise}</p>
                                    <p><strong>Poste :</strong> {exp.poste}</p>
                                    <p><strong>Description :</strong> {exp.description}</p>
                                </li>
                            ))
                        ) : (
                            <p>Aucune expérience professionnelle.</p>
                        )}
                    </ul>
                </div>
            )}

            <h1>Recommandations</h1>
            <button
                onClick={() => navigate("/create-recomm")}
                style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >Écrire une recommandation</button>

            {messageRecomms && <p>{messageRecomms}</p>}
            {recomms.length > 0 ? (
                <ul>
                    {recomms.map((recomm) => (
                        <li key={recomm._id}>
                            <p>{recomm.message}</p>
                        {recomm != null && (recomm.author == user._id || cv._id == user.id)
                            ? <button onClick={() => handleDelete(recomm._id)}>Supprimer</button>
                            : ""
                        }
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Pas de recommandation.</p>
            )}
        </div>
    );
};

export default CvDetails;
