import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";

import Logo from "../../assets/Logo.png";
import manVote from "../../assets/manVote.png";
import C1 from "../../assets/C1.jpg";
import C2 from "../../assets/C2.jpeg";
import C3 from "../../assets/C3.jpeg";
import C4 from "../../assets/C4.jpg";
import C5 from "../../assets/C5.jpg";
import C6 from "../../assets/C6.jpg";

const CONTRACT_ADDRESS = "0xbBb94873e980aA4eB39F01ec164F80D58e9b3541";

const candidatsData = [
  { id: 1, nom: "Levit NGONGO", parti: "Parti National", image: C1, numere: "385" },
  { id: 2, nom: "Aline KASONGO", parti: "Union Démocratique", image: C2, numere: "295" },
  { id: 3, nom: "ATIA BINTI stella", parti: "Front Populaire", image: C3, numere: "335" },
  { id: 4, nom: "Jean MUKOKO", parti: "Front Populaire", image: C4, numere: "255" },
  { id: 5, nom: "ANGE BINTI", parti: "Front Populaire", image: C5, numere: "249" },
  { id: 6, nom: "LMR LUMIERE", parti: "T.P.R", image: C6, numere: "345" },
];

const VotePage = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const now = new Date();

  // 🔐 GET USER CONNECTÉ
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const terminalId = user?.terminalId || "TERM-DRC-001";
  const electeurId = user?.numeroCarte || "UNKNOWN";

  const qrData = selected
    ? JSON.stringify({
        candidat: selected.nom,
        numero: selected.numere,
        terminal: terminalId,
        electeur: electeurId,
        contract: CONTRACT_ADDRESS,
        date: now.toISOString(),
      })
    : "";

  const handleVote = () => {
    if (!selected) return;
    setShowModal(true);
  };

  const confirmVote = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/vote",
        {
          candidatId: selected.id,
          terminalLocalisation: terminalId,
        },
        { withCredentials: true }
      );

      setShowModal(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <img src={Logo} className="w-14 h-14" />
        <h1 className="text-xl font-bold">
          CENI RDC - Vote Électronique
        </h1>
      </div>

      {/* CANDIDATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {candidatsData.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className={`bg-white p-3 rounded-lg shadow cursor-pointer text-center border
              ${selected?.id === c.id ? "border-green-600 scale-105" : ""}
            `}
          >
            <img src={c.image} className="w-full h-32 object-cover rounded-md" />
            <h2 className="text-sm font-semibold">{c.nom}</h2>
            <p className="text-xs">{c.parti}</p>
            <p className="text-green-600 font-bold">{c.numere}</p>
          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <img src={manVote} className="w-24 animate-bounce mr-4" />

        <button
          onClick={handleVote}
          disabled={!selected}
          className={`px-6 py-3 rounded-lg text-white font-bold
            ${selected ? "bg-green-600" : "bg-gray-400"}
          `}
        >
          Valider mon vote
        </button>
      </div>

      {/* ================= MODAL BULLETIN ================= */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          {/* BULLETIN */}
          <div id="bulletin" className="bg-white w-[500px] p-6 rounded-xl shadow-2xl">

            {/* HEADER */}
            <div className="flex justify-center items-center gap-2 mb-3">
              <img src={Logo} className="w-10 h-10" />
              <span className="font-bold">CENI RDC</span>
            </div>

            <h2 className="text-center font-bold mb-3">
              Bulletin de vote officiel
            </h2>

            {/* CANDIDAT */}
            <div className="text-center">
              <img src={selected.image} className="w-28 h-28 mx-auto rounded-full" />
              <h3 className="font-semibold mt-2">{selected.nom}</h3>
              <p className="text-sm">{selected.parti}</p>
              <p className="text-green-600 font-bold">{selected.numere}</p>
            </div>

            {/* QR CODE */}
            <div className="flex justify-center mt-4">
              <QRCodeCanvas value={qrData} size={120} />
            </div>

            {/* INFOS */}
            <div className="mt-4 text-xs text-gray-600 space-y-1">
              <p>Terminal: {terminalId}</p>
              <p>Smart Contract: {CONTRACT_ADDRESS}</p>
              <p>Electeur: {electeurId}</p>
              <p>Date: {now.toLocaleDateString()}</p>
              <p>Heure: {now.toLocaleTimeString()}</p>
              <p>Blockchain: Vote sécurisé et immuable</p>
            </div>

            {/* PRINT BUTTON */}
            <button
              onClick={() => window.print()}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            >
              Imprimer bulletin
            </button>

            {/* CONFIRM */}
            <button
              onClick={confirmVote}
              className="mt-2 w-full bg-blue-700 text-white py-2 rounded"
            >
              Confirmer vote
            </button>

          </div>

        </div>
      )}

      

    </div>
  );
};

export default VotePage;