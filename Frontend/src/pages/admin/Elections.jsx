import { useState } from "react";
import Logo from "../../assets/Logo.png";

export default function Elections() {

  const [elections, setElections] = useState([]);
  const [form, setForm] = useState({
    titre: "",
    date: ""
  });

  // ➕ Créer une élection
  const ajouterElection = () => {
    if (!form.titre || !form.date) return;

    const newElection = {
      id: Date.now(),
      titre: form.titre,
      date: form.date,
      statut: "Clôturée"
    };

    setElections([...elections, newElection]);
    setForm({ titre: "", date: "" });
  };

  // 🔓 Ouvrir élection
  const ouvrirElection = (id) => {
    setElections(elections.map(e =>
      e.id === id ? { ...e, statut: "Ouverte" } : e
    ));
  };

  // 🔒 Clôturer élection
  const cloturerElection = (id) => {
    setElections(elections.map(e =>
      e.id === id ? { ...e, statut: "Clôturée" } : e
    ));
  };

  // ❌ Supprimer
  const supprimer = (id) => {
    setElections(elections.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <img src={Logo} className="w-12 h-12" />
        <h1 className="text-xl font-bold">
          Gestion des Élections
        </h1>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 animate-fadeUp">

        <h2 className="font-semibold mb-3">
          🗳️ Créer une élection
        </h2>

        <div className="grid md:grid-cols-2 gap-3">

          <input
            type="text"
            placeholder="Titre de l'élection"
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded"
          />

        </div>

        <button
          onClick={ajouterElection}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Créer élection
        </button>

      </div>

      {/* LISTE */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

        {elections.map((e) => (
          <div
            key={e.id}
            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition"
          >

            <h3 className="font-semibold">{e.titre}</h3>

            <p className="text-sm text-gray-500">
              📅 {e.date}
            </p>

            {/* STATUT */}
            <p className={`text-xs mt-2 font-bold
              ${e.statut === "Ouverte" ? "text-green-600" : "text-red-500"}
            `}>
              {e.statut}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">

              {e.statut === "Clôturée" && (
                <button
                  onClick={() => ouvrirElection(e.id)}
                  className="bg-green-600 text-white px-2 py-1 text-xs rounded"
                >
                  Ouvrir
                </button>
              )}

              {e.statut === "Ouverte" && (
                <button
                  onClick={() => cloturerElection(e.id)}
                  className="bg-orange-600 text-white px-2 py-1 text-xs rounded"
                >
                  Clôturer
                </button>
              )}

              <button
                onClick={() => supprimer(e.id)}
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