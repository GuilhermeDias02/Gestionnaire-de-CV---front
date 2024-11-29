import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getCvById,
    getRecommendations,
    createRecommendation,
    deleteRecommendation,
} from "../api";

const CvDetails = () => {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState({
        message: "",
        rating: 0,
    });
    const [message, setMessage] = useState("");
    const [isOwner, setIsOwner] = useState(false); // Nouveau état pour vérifier la propriété

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId"); // ID utilisateur connecté
                console.log("ID utilisateur connecté :", userId)

                // Récupérer les détails du CV
                const cvData = await getCvById(id, token);

                console.log("CV reçu :", cvData); // Vérifiez ici que `author` est présent
                setCv(cvData);

                // Vérifier si l'utilisateur connecté est l'auteur du CV
                if (cvData.author === userId) {
                    setIsOwner(true); // Mise à jour si utilisateur est propriétaire
                }

                // Récupérer les recommandations
                const recommendationsData = await getRecommendations(id);
                setRecommendations(recommendationsData);
            } catch (error) {
                setMessage("Erreur lors de la récupération des données.");
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleRecommendationSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await createRecommendation(id, newRecommendation.message, newRecommendation.rating, token);
            setMessage("Recommandation ajoutée avec succès !");
            setNewRecommendation({ message: "", rating: 0 });

            const updatedRecommendations = await getRecommendations(id);
            setRecommendations(updatedRecommendations);
        } catch (error) {
            setMessage("Erreur lors de l'ajout de la recommandation.");
            console.error(error);
        }
    };

    const handleDeleteRecommendation = async (recommendationId) => {
        try {
            const token = localStorage.getItem("token");
            await deleteRecommendation(recommendationId, token);

            setMessage("Recommandation supprimée avec succès !");
            const updatedRecommendations = await getRecommendations(id);
            setRecommendations(updatedRecommendations);
        } catch (error) {
            setMessage("Erreur lors de la suppression de la recommandation.");
            console.error(error);
        }
    };

    if (!cv) {
        return <p>Chargement des détails...</p>;
    }

    return (
        <div>
            <h1>CV</h1>
            {message && <p>{message}</p>}

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

            <h2>Recommandations</h2>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec) => (
                        <li key={rec._id}>
                            <p>{rec.message}</p>
                            <p><strong>Note :</strong> {rec.rating} / 5</p>

                            {/* Bouton supprimer, affiché seulement si l'utilisateur est le propriétaire */}
                            {isOwner && (
                                <button onClick={() => handleDeleteRecommendation(rec._id)}>
                                    Supprimer
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune recommandation pour ce CV.</p>
            )}

            <h2>Laisser une recommandation</h2>
            <form onSubmit={handleRecommendationSubmit}>
                <textarea
                    placeholder="Écrivez votre recommandation..."
                    value={newRecommendation.message}
                    onChange={(e) =>
                        setNewRecommendation({ ...newRecommendation, message: e.target.value })
                    }
                    required
                />
                <div>
                    <label>Note :</label>
                    <select
                        value={newRecommendation.rating}
                        onChange={(e) =>
                            setNewRecommendation({ ...newRecommendation, rating: parseInt(e.target.value) })
                        }
                        required
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="submit">Ajouter une recommandation</button>
            </form>
        </div>
    );
};

export default CvDetails;