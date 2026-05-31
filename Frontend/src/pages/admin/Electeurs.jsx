import { useState } from "react";
import Logo from "../../assets/Logo.png";
import axios from "axios";

export default function Electeurs() {
  const [electeurs, setElecteurs] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    idElecteur: "",
    bureau: "",
  });

  // Ajouter électeur
  const ajouterElecteur = async () => {
    if (!form.nom || !form.idElecteur) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/election/enroll",
        [form.idElecteur]
      );

      console.log(res.data);

      const newElecteur = {
        ...form,
        id: Date.now(),
        statut: "Validé",
      };

      setElecteurs([...electeurs, newElecteur]);

      setForm({
        nom: "",
        idElecteur: "",
        bureau: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Valider électeur
  const validerElecteur = (id) => {
    setElecteurs(
      electeurs.map((e) =>
        e.id === id ? { ...e, statut: "Validé" } : e
      )
    );
  };

  // Supprimer électeur
  const supprimerElecteur = (id) => {
    setElecteurs(electeurs.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
        <h1 className="text-xl font-bold">
          Gestion des Électeurs
        </h1>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">
          Enrôlement électeur
        </h2>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Nom complet"
            value={form.nom}
            onChange={(e) =>
              setForm({ ...form, nom: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="ID Électeur"
            value={form.idElecteur}
            onChange={(e) =>
              setForm({ ...form, idElecteur: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Bureau de vote"
            value={form.bureau}
            onChange={(e) =>
              setForm({ ...form, bureau: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={ajouterElecteur}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enrôler électeur
        </button>
      </div>

      {/* LISTE */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {electeurs.map((e) => (
          <div
            key={e.id}
            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition"
          >
            <h3 className="font-semibold">{e.nom}</h3>

            <p className="text-sm text-gray-500">
              ID : {e.idElecteur}
            </p>

            <p className="text-xs text-gray-400">
              Bureau : {e.bureau}
            </p>

            {/* STATUT */}
            <p
              className={`text-xs mt-2 font-bold ${
                e.statut === "Validé"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {e.statut}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              {e.statut !== "Validé" && (
                <button
                  onClick={() => validerElecteur(e.id)}
                  className="bg-green-600 text-white px-2 py-1 text-xs rounded"
                >
                  Valider
                </button>
              )}

              <button
                onClick={() => supprimerElecteur(e.id)}
                className="bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}