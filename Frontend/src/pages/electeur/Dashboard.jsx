import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

// ETAPES
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import step4 from "../../assets/step4.png";
import step5 from "../../assets/step5.png";

// BLOCKCHAIN
import Blockchain2 from "../../assets/Blockchain2.png";

const steps = [step1, step2, step3, step4, step5];

const ElectorDashboard = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % steps.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">

      {/* ================= HEADER OFFICIEL ================= */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-4 flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 h-12" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Commission Électorale Nationale Indépendante CENI
            </h1>
            <p className="text-xs text-gray-500">
              République Démocratique du Congo
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Statut du système</p>
          <p className="text-green-600 font-semibold text-sm">
            ● Système opérationnel
          </p>
        </div>

      </div>

      {/* ================= CONTENU PRINCIPAL ================= */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">

        {/* ================= GAUCHE ================= */}
        <div className="bg-white rounded-xl shadow-md p-5">

          <h2 className="text-md font-bold text-gray-800 mb-2">
            Procédure de vote
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Veuillez suivre les étapes pour garantir un vote valide et sécurisé.
          </p>

          {/* ETAPES MINI */}
          <div className="flex gap-2 justify-center mb-4 flex-wrap">
            {steps.map((img, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`border rounded-md cursor-pointer overflow-hidden transition
                  ${i === index ? "border-blue-600 scale-105" : "border-gray-200"}
                `}
              >
                <img src={img} className="w-12 h-12 object-cover" />
              </div>
            ))}
          </div>

          {/* IMAGE PRINCIPALE */}
          <div className={`transition ${fade ? "opacity-100" : "opacity-0"}`}>
            <img
              src={steps[index]}
              className="w-full max-h-[250px] object-contain rounded-md border"
            />
          </div>

        </div>

        {/* ================= DROITE ================= */}
        <div className="bg-white rounded-xl shadow-md p-5">

          <h2 className="text-md font-bold text-gray-800 mb-3">
            Sécurité du vote
          </h2>

          <div className="relative">

            <img
              src={Blockchain2}
              className="w-full max-h-[260px] object-contain rounded-md border"
            />

            {/* BADGE SECURITE */}
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              Sécurisé
            </div>

          </div>

          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p>✔ Chiffrement des données</p>
            <p>✔ Enregistrement immuable</p>
            <p>✔ Traçabilité du vote</p>
          </div>

        </div>

      </div>

      {/* ================= PIED + ACTION ================= */}
      <div className="mt-8 text-center">

        <p className="text-xs text-gray-500 mb-3">
          Assurez-vous de confirmer votre choix avant validation finale.
        </p>

        <button
          onClick={() => navigate("/electeur/vote")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold shadow"
        >
          Accéder au vote
        </button>

      </div>

    </div>
  );
};

export default ElectorDashboard;