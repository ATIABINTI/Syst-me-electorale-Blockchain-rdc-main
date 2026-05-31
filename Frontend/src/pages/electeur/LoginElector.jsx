import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../assets/Logo.png";
import manVote from "../../assets/manVote.png";
import Blckvote2 from "../../assets/Blckvote2.png";

const LoginElector = () => {
  const [idCard, setIdCard] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!idCard.trim()) {
      setError("Veuillez entrer votre numéro de carte");
      return;
    }

    setLoading(true);

    try {
      // 🔐 Login direct par numéro de carte uniquement
      const { data } = await axios.post(
        "http://localhost:4000/api/login",
        {
          numeroCarte: idCard.trim(),
        }
      );

      if (data.success) {
        // option: stocker l’électeur si besoin
        localStorage.setItem("electeur", JSON.stringify(data.electeur));

        // redirection dashboard
        navigate("/electeur/dashboard");
      } else {
        setError("Numéro de carte invalide");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur de connexion serveur"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={Blckvote2}
          className="w-full h-full object-cover"
          alt="background"
        />
        <div className="absolute inset-0 bg-blue-950/80"></div>
      </div>

      {/* CARD */}
      <div className="relative z-10 bg-white w-[420px] p-8 rounded-2xl shadow-2xl">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} className="w-24 h-16 mb-2" alt="logo" />
          <h1 className="text-xl font-bold text-blue-900">
            Connexion Électeur
          </h1>
          <p className="text-xs text-gray-500">
            Système de vote sécurisé
          </p>
        </div>

        {/* INPUT */}
        <label className="text-sm font-semibold">
          Numéro de carte électorale
        </label>

        <input
          value={idCard}
          onChange={(e) => setIdCard(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
          placeholder="Ex: 22TT345"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mt-3 font-medium">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-5 bg-blue-800 text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition"
        >
          {loading ? "Vérification..." : "Se connecter"}
        </button>

        <p className="text-xs text-center mt-4 text-gray-500">
          ⚠ Accès basé uniquement sur la carte électorale
        </p>

        <div className="flex justify-center mt-3">
          <img src={manVote} className="w-12" alt="vote" />
        </div>

      </div>
    </div>
  );
};

export default LoginElector;