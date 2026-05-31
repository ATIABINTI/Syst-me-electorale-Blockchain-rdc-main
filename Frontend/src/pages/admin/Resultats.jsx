import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Logo from "../../assets/Logo.png";
import L from "leaflet";

// Fix icône Leaflet (important sinon markers invisibles)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Resultats() {
  const [province, setProvince] = useState("Toutes");

  // 👤 candidats
  const candidats = [
    {
      id: 1,
      nom: "Levit NGONGO",
      parti: "Parti National",
      pourcentage: 46,
      voix: 4250000,
      image: "C1.jpg",
    },
    {
      id: 2,
      nom: "Aline KASONGO",
      parti: "Union Démocratique",
      pourcentage: 34,
      voix: 3100000,
      image: "C2.jpg",
    },
    {
      id: 3,
      nom: "ATIA BINTI",
      parti: "Front Populaire",
      pourcentage: 20,
      voix: 1900000,
      image: "C3.jpg",
    },
  ];

  // 🇨🇩 centres (exemple RDC)
  const centres = [
    { id: 1, ville: "Kinshasa", lat: -4.4419, lng: 15.2663, statut: "Actif" },
    { id: 2, ville: "Lubumbashi", lat: -11.6647, lng: 27.4794, statut: "Actif" },
    { id: 3, ville: "Goma", lat: -1.6792, lng: 29.2228, statut: "Inactif" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 h-12" />
          <div>
            <h1 className="font-bold text-lg">
              Résultats Électoraux - RDC
            </h1>
            <p className="text-xs text-gray-500">
              Système blockchain sécurisé
            </p>
          </div>
        </div>

        <span className="text-green-600 font-semibold">
          ● En temps réel
        </span>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ================= GAUCHE : RESULTATS ================= */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1">

          <h2 className="font-bold mb-4">Résultats candidats</h2>

          {candidats.map((c) => (
            <div key={c.id} className="mb-5">

              <div className="flex items-center gap-3">
                <img
                  src={c.image}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold">{c.nom}</p>
                  <p className="text-xs text-gray-500">{c.parti}</p>
                </div>

                <p className="font-bold text-blue-600">
                  {c.pourcentage}%
                </p>
              </div>

              {/* BARRE */}
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                  className="bg-blue-600 h-2 rounded"
                  style={{ width: `${c.pourcentage}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {c.voix.toLocaleString()} voix
              </p>

            </div>
          ))}

        </div>

        {/* ================= CENTRE : CARTE RDC ================= */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1 lg:col-span-1">

          <h2 className="font-bold mb-3">Carte de la RDC</h2>

          <MapContainer
            center={[-2.5, 23.5]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {centres.map((c) => (
              <Marker key={c.id} position={[c.lat, c.lng]}>
                <Popup>
                  <strong>{c.ville}</strong>
                  <br />
                  Statut:{" "}
                  <span
                    style={{
                      color: c.statut === "Actif" ? "green" : "red",
                    }}
                  >
                    {c.statut}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

        </div>

        {/* ================= DROITE : FILTRES ================= */}
        <div className="bg-white p-4 rounded-xl shadow">

          <h2 className="font-bold mb-4">Filtres</h2>

          <label className="text-sm">Province</label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option>Toutes</option>
            <option>Kinshasa</option>
            <option>Haut-Katanga</option>
            <option>Nord-Kivu</option>
          </select>

          <div className="mt-4 text-sm">
            <p className="font-semibold">Statut système</p>
            <p> Scrutin: OUVERT</p>
            <p> Blockchain: ACTIVE</p>
            <p> Sync: OK</p>
          </div>

        </div>

      </div>

      {/* FOOTER BLOCKCHAIN */}
      <div className="mt-4 bg-green-50 border border-green-200 p-3 rounded-xl text-center text-sm">
        🔐 Tous les résultats sont enregistrés sur la blockchain et immuables
      </div>

    </div>
  );
}