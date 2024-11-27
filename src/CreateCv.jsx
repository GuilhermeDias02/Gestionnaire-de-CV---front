import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCv } from "./api";

const CreateCv = () => {
  const [cvData, setCvData] = useState({
    titre: "",
    adresse: "",
    description: "",
    techSkills: [""],
    softSkills: [""],
    certifications: [""],
    expPro: [
      {
        entreprise: "",
        poste: "",
        description: "",
      },
    ],
    visible: true,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleArrayChange = (index, key, value, arrayKey) => {
    const updatedArray = [...cvData[arrayKey]];
    updatedArray[index] = value;
    setCvData({ ...cvData, [arrayKey]: updatedArray });
  };

  const addToArray = (arrayKey) => {
    setCvData({ ...cvData, [arrayKey]: [...cvData[arrayKey], ""] });
  };

  const removeFromArray = (index, arrayKey) => {
    const updatedArray = [...cvData[arrayKey]];
    updatedArray.splice(index, 1);
    setCvData({ ...cvData, [arrayKey]: updatedArray });
  };

  const handleExpProChange = (index, field, value) => {
    const updatedExpPro = [...cvData.expPro];
    updatedExpPro[index][field] = value;
    setCvData({ ...cvData, expPro: updatedExpPro });
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      expPro: [...cvData.expPro, { entreprise: "", poste: "", description: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Utilisateur non connecté. Veuillez vous connecter.");
        navigate("/login");
        return;
      }

      await createCv(cvData, token);
      setMessage("CV créé avec succès !");

      setCvData({
        titre: "",
        adresse: "",
        description: "",
        techSkills: [""],
        softSkills: [""],
        certifications: [""],
        expPro: [
          {
            entreprise: "",
            poste: "",
            description: "",
          },
        ],
        visible: true,
      });

      setTimeout(() => navigate("/my-cvs"), 2000);
    } catch (error) {
      console.error("Error creating CV:", error);
      setMessage(error.response?.data?.error || "Erreur lors de la création du CV.");
    }
  };

  return (
    <div>
      <h1>Créer un CV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={cvData.titre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={cvData.adresse}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={cvData.description}
          onChange={handleChange}
        />

        <h3>Compétences techniques</h3>
        {cvData.techSkills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Compétence technique"
              value={skill}
              onChange={(e) =>
                handleArrayChange(index, "techSkills", e.target.value, "techSkills")
              }
            />
            <button type="button" onClick={() => removeFromArray(index, "techSkills")}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addToArray("techSkills")}>
          Ajouter une compétence technique
        </button>

        <h3>Compétences générales</h3>
        {cvData.softSkills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Compétence générale"
              value={skill}
              onChange={(e) =>
                handleArrayChange(index, "softSkills", e.target.value, "softSkills")
              }
            />
            <button type="button" onClick={() => removeFromArray(index, "softSkills")}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addToArray("softSkills")}>
          Ajouter une compétence générale
        </button>

        <h3>Certifications</h3>
        {cvData.certifications.map((cert, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Certification"
              value={cert}
              onChange={(e) =>
                handleArrayChange(index, "certifications", e.target.value, "certifications")
              }
            />
            <button type="button" onClick={() => removeFromArray(index, "certifications")}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addToArray("certifications")}>
          Ajouter une certification
        </button>

        <h3>Expériences professionnelles</h3>
        {cvData.expPro.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Entreprise"
              value={exp.entreprise}
              onChange={(e) => handleExpProChange(index, "entreprise", e.target.value)}
            />
            <input
              type="text"
              placeholder="Poste"
              value={exp.poste}
              onChange={(e) => handleExpProChange(index, "poste", e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                handleExpProChange(index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          Ajouter une expérience
        </button>

        <label>
          Visible :
          <input
            type="checkbox"
            name="visible"
            checked={cvData.visible}
            onChange={(e) =>
              setCvData({ ...cvData, visible: e.target.checked })
            }
          />
        </label>
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateCv;