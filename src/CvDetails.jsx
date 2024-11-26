import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvById } from "./api"; // Import de la fonction depuis api.jsx

const CvDetails = () => {
    const { id } = useParams(); // Récupère l'ID du CV depuis l'URL
    const [cv, setCv] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCvDetails = async () => {
            try {
                const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
                const cvData = await getCvById(id, token); // Appelle la fonction depuis api.jsx
                setCv(cvData); // Stocke les données du CV dans l'état
            } catch (error) {
                setMessage("Erreur lors de la récupération du CV.", error);
            }
        };

        fetchCvDetails();
    }, [id]);

    // Si le CV n'est pas encore chargé, affichez un message de chargement
    if (!cv) {
        return <p>Chargement des détails...</p>;
    }

    return (
        <div>
            <h1>Détails du CV</h1>
            {message && <p>{message}</p>}
            {cv && (
                <div>
                    <h2>{cv.titre}</h2>
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
                                    <p><strong>Durée :</strong> {exp.duree}</p>
                                </li>
                            ))
                        ) : (
                            <p>Aucune expérience professionnelle.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CvDetails;
