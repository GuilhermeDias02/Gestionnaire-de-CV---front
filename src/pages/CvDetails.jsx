import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvById, getRecommendations, createRecommendation } from "../api";

const CvDetails = () => {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [message, setMessage] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState({
        message: "",
        rating: 0,
    });

    useEffect(() => {
        const fetchCvDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const cvData = await getCvById(id, token);
                const recommendationsData = await getRecommendations(id);
                setCv(cvData);
                setRecommendations(recommendationsData);
            } catch (error) {
                setMessage("Erreur lors de la récupération du CV ou des recommandations.", error);
            }
        };

        fetchCvDetails();
    }, [id]);

    const handleRecommendationSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("Vous devez être connecté pour laisser une recommandation.");
                return;
            }
            await createRecommendation(id, newRecommendation.message, newRecommendation.rating, token);
            setMessage("Recommandation ajoutée avec succès !");
            setNewRecommendation({ message: "", rating: 0 });
            const updatedRecommendations = await getRecommendations(id);
            setRecommendations(updatedRecommendations);
        } catch (error) {
            setMessage("Erreur lors de l'ajout de la recommandation.", error);
        }
    };

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
            <h2>Recommandations</h2>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>
                            <p>{rec.message}</p>
                            <p><strong>Note :</strong> {rec.rating} / 5</p>
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
