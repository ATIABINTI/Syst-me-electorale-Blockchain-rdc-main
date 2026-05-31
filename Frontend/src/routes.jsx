import { Routes, Route,Router } from "react-router-dom";

import ElectorDashboard from "./pages/electeur/Dashboard";
import VotePage from "./pages/electeur/VotePage";
import LoginElector from "./pages/electeur/LoginElector";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Electeurs from "./pages/admin/Electeurs";
import Candidats from "./pages/admin/Candidats";
import Elections from "./pages/admin/Elections";
import Terminaux from "./pages/admin/Terminaux";
import Resultats from "./pages/admin/Resultats";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginElector />} />
      <Route path="/electeur/dashboard" element={<ElectorDashboard />} />
      <Route path="/electeur/vote" element={<VotePage />} />
      <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/admin/electeurs" element={<Electeurs />} />
      <Route path="/admin/candidats" element={<Candidats />} />
      <Route path="/admin/elections" element={<Elections />} />
      <Route path="/admin/terminaux" element={<Terminaux />} />
      <Route path="/admin/resultats" element={<Resultats />} />
      
    </Routes>
  );
};

export default AppRoutes;