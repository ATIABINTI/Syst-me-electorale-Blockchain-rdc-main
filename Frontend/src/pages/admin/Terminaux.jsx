import { useState } from "react";
import Logo from "../../assets/Logo.png";

export default function Terminaux() {
  const [terminaux, setTerminaux] = useState([]);

  const [form, setForm] = useState({
    localisation: "",
    election: ""
  });

  // ➕ Ajouter terminal avec ID automatique
  const ajouterTerminal = () => {
    if (!form.localisation || !form.election) return;

    const numero = terminaux.length + 1;

    const newTerminal = {
      id: Date.now(),
      idTerminal: `TERM-${numero.toString().padStart(3, "0")}`,
      localisation: form.localisation,
      election: form.election,
      statut: "Inactif",
      votes: 0
    };

    setTerminaux([...terminaux, newTerminal]);

    setForm({
      localisation: "",
      election: ""
    });
  };

  // ✔ Activer terminal
  const activer = (id) => {
    setTerminaux(
      terminaux.map((t) =>
        t.id === id ? { ...t, statut: "Actif" } : t
      )
    );
  };

  // ❌ Désactiver terminal
  const desactiver = (id) => {
    setTerminaux(
      terminaux.map((t) =>
        t.id === id ? { ...t, statut: "Inactif" } : t
      )
    );
  };

  // 🗑 Supprimer terminal
  const supprimer = (id) => {
    setTerminaux(terminaux.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-4 mb-6">
        <img src={Logo} alt="CENI" className="w-14 h-14" />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des Terminaux de Vote
          </h1>

          <p className="text-sm text-gray-500">
            Commission Électorale Nationale Indépendante
          </p>
        </div>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Total Terminaux</p>
          <h2 className="text-3xl font-bold text-blue-700">
            {terminaux.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Terminaux Actifs</p>
          <h2 className="text-3xl font-bold text-green-600">
            {terminaux.filter((t) => t.statut === "Actif").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Terminaux Inactifs</p>
          <h2 className="text-3xl font-bold text-red-600">
            {terminaux.filter((t) => t.statut === "Inactif").length}
          </h2>
        </div>

      </div>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-lg font-bold mb-4">
          📡 Ajouter un nouveau terminal
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Localisation (Ville / Centre)"
            value={form.localisation}
            onChange={(e) =>
              setForm({ ...form, localisation: e.target.value })
            }
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Élection liée"
            value={form.election}
            onChange={(e) =>
              setForm({ ...form, election: e.target.value })
            }
            className="border rounded-lg p-3"
          />

        </div>

        <button
          onClick={ajouterTerminal}
          className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Ajouter le terminal
        </button>

      </div>

      {/* LISTE */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {terminaux.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow p-5 hover:scale-105 transition"
          >

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-blue-700">
                {t.idTerminal}
              </h3>

              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  t.statut === "Actif"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t.statut}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              📍 {t.localisation}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              🗳️ {t.election}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              📊 Votes reçus : {t.votes}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">

              {t.statut === "Inactif" ? (
                <button
                  onClick={() => activer(t.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Activer
                </button>
              ) : (
                <button
                  onClick={() => desactiver(t.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Désactiver
                </button>
              )}

              <button
                onClick={() => supprimer(t.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                Supprimer
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Si vide */}
      {terminaux.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Aucun terminal enregistré.
        </div>
      )}

    </div>
  );
}