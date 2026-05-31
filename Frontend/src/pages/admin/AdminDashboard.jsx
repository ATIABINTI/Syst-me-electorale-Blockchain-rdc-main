import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 🔢 KPI
  const kpis = [
    { label: "Électeurs", value: "1 000 250", icon: "👤" },
    { label: "Candidats", value: "12", icon: "🧑‍💼" },
    { label: "Votes", value: "980", icon: "🗳️" },
    { label: "Terminaux", value: "18", icon: "🖥️" },
  ];

  // 📂 Modules
  const modules = [
    { name: "Électeurs", path: "/admin/electeurs" },
    { name: "Candidats", path: "/admin/candidats" },
    { name: "Élections", path: "/admin/elections" },
    { name: "Terminaux", path: "/admin/terminaux" },
    { name: "Résultats", path: "/admin/resultats" },
  ];

  // 📍 Terminaux RDC
  const terminaux = [
    {
      ville: "Kinshasa",
      position: [-4.325, 15.322],
      statut: "Actif",
      id: "TERM-001",
      votes: 350,
    },
    {
      ville: "Lubumbashi",
      position: [-11.664, 27.479],
      statut: "Actif",
      id: "TERM-002",
      votes: 210,
    },
    {
      ville: "Goma",
      position: [-1.679, 29.222],
      statut: "Éteint",
      id: "TERM-003",
      votes: 0,
    },
    {
      ville: "Kisangani",
      position: [0.515, 25.191],
      statut: "Actif",
      id: "TERM-004",
      votes: 120,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 h-12 animate-pulse" />

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              CENI RDC – Administration
            </h1>

            <p className="text-xs text-gray-500">
              Système de vote électronique sécurisé
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Statut système</p>
          <p className="text-green-600 font-semibold">
            ● En ligne
          </p>
        </div>

      </div>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow text-center hover:scale-105 transition"
          >
            <div className="text-2xl">{k.icon}</div>
            <h2 className="text-lg font-bold">{k.value}</h2>
            <p className="text-xs text-gray-500">{k.label}</p>
          </div>
        ))}
      </div>

      {/* ================= CARTE RDC ================= */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">
            🗺️ Carte interactive des terminaux - RDC
          </h2>

          <div className="flex gap-4 text-xs">
            <span className="text-green-600 font-semibold">🟢 Actif</span>
            <span className="text-red-600 font-semibold">🔴 Éteint</span>
          </div>
        </div>

        <MapContainer
          center={[-4.5, 23.5]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-[450px] w-full rounded-xl z-0"
        >

          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {terminaux.map((t, i) => (
            <CircleMarker
              key={i}
              center={t.position}
              radius={10}
              pathOptions={{
                color:
                  t.statut === "Actif"
                    ? "green"
                    : "red",
                fillColor:
                  t.statut === "Actif"
                    ? "green"
                    : "red",
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p><strong>{t.ville}</strong></p>
                  <p>ID : {t.id}</p>
                  <p>Statut : {t.statut}</p>
                  <p>Votes : {t.votes}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        </MapContainer>

      </div>

      {/* ================= STATUT ================= */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2 text-gray-700">
          ⚙️ État du système
        </h2>

        <div className="flex flex-wrap gap-6 text-sm">
          <p>
            🗳️ Scrutin :
            <span className="text-green-600 font-semibold ml-1">
              OUVERT
            </span>
          </p>

          <p>
            🔐 Blockchain :
            <span className="text-green-600 font-semibold ml-1">
              CONNECTÉE
            </span>
          </p>

          <p>
            🖥️ Serveur :
            <span className="text-green-600 font-semibold ml-1">
              ACTIF
            </span>
          </p>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <h2 className="font-semibold mb-3 text-gray-700">
          Actions rapides
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/admin/candidats")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Ajouter candidat
          </button>

          <button
            onClick={() => navigate("/admin/electeurs")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            👤 Enrôler électeur
          </button>

          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            🟢 Ouvrir scrutin
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            🔴 Clôturer scrutin
          </button>

        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="bg-white p-4 rounded-xl shadow">

        <h2 className="font-semibold mb-3 text-gray-700">
          Modules
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <div
              key={i}
              onClick={() => navigate(m.path)}
              className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition text-center"
            >
              {m.name}
            </div>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <p className="text-center text-xs text-gray-500 mt-8">
        © 2026 CENI RDC — Système basé sur la blockchain
      </p>

    </div>
  );
}