import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvById, getRecommByCv } from "../api";

const CvDetails = () => {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [message, setMessage] = useState("");
    const [recomms, setRecomms] = useState([]);
    const [messageRecomms, setMessageRecomms] = useState("");

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
                setMessageRecomms("Erreur lors de la récupération des recomms");
            }
        }
        const fetch

        fetchCvDetails();
        fetchRecomms();
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
            {messageRecomms && <p>{messageRecomms}</p>}
            {recomms.length > 0 ? (
                <ul>
                    {recomms.map((recomm) => (
                        <li key={recomm._id}>
                            <h2
                                className="recomm-title"
                                onClick={() => handleViewDetails(cv._id)}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                {cv.titre}
                            </h2>
                            <p>{recomm.message}</p>

                            {/* <button onClick={() => handleEdit(cv._id)}>Éditer</button> */}
                            {}
                                <button onClick={() => handleDelete(cv._id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Pas de recommandations.</p>
            )}
        </div>
    );
};

export default CvDetails;
