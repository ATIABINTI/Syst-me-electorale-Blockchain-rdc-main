import { useState } from "react";
import Logo from "../../assets/Logo.png";

// images (exemple)
import C1 from "../../assets/C1.jpg";
import C2 from "../../assets/C2.jpeg";
import C3 from "../../assets/C3.jpeg";
import C4 from "../../assets/C4.jpg";
import C5 from "../../assets/C5.jpg";
import C6 from "../../assets/C6.jpg";

export default function Candidats() {

  //  simulation BDD + blockchain status
  const [candidats, setCandidats] = useState([
    {
      id: 1,
      nom: "Levit NGONGO",
      parti: "Parti National",
      image: C1,
      info: "Ancien ministre de l’économie",
      numero: "385",
      statut: "Enregistré Blockchain",
    },
    {
      id: 2,
      nom: "Aline KASONGO",
      parti: "Union Démocratique",
      image: C2,
      info: "Juriste et militante",
      numero: "295",
      statut: "Enregistré Blockchain",
    },
    {
      id: 3,
      nom: "ATIA BINTI Stella",
      parti: "Front Populaire",
      image: C3,
      info: "Économiste et entrepreneur",
      numero: "335",
      statut: "Enregistré Blockchain",
    },
  ]);

  // ➕ simulation ajout candidat
  const ajouterCandidat = () => {
    const newCandidat = {
      id: Date.now(),
      nom: "Nouveau Candidat",
      parti: "Indépendant",
      image: C1,
      info: "En cours d’enrôlement",
      numero: Math.floor(Math.random() * 999),
      statut: "En attente blockchain",
    };

    setCandidats([...candidats, newCandidat]);
  };

  // ❌ suppression
  const supprimer = (id) => {
    setCandidats(candidats.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 h-12" />
          <h1 className="text-xl font-bold">
            Gestion des Candidats - CENI
          </h1>
        </div>

        <button
          onClick={ajouterCandidat}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Enrôler candidat
        </button>
      </div>

      {/* GRID CANDIDATS */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

        {candidats.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >

            {/* IMAGE */}
            <img
              src={c.image}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* INFO */}
            <h2 className="font-bold mt-2">{c.nom}</h2>
            <p className="text-sm text-gray-500">{c.parti}</p>
            <p className="text-xs text-gray-400">{c.info}</p>

            {/* NUMERO */}
            <p className="text-sm mt-2">
              ID N° {c.numero}
            </p>

            {/* STATUT BLOCKCHAIN */}
            <p className={`text-xs mt-2 font-semibold ${
              c.statut.includes("Blockchain")
                ? "text-green-600"
                : "text-orange-500"
            }`}>
              🔐 {c.statut}
            </p>

            {/* ACTIONS */}
            <button
              onClick={() => supprimer(c.id)}
              className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
            >
              Supprimer
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}