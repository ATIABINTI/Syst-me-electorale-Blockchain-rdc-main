import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   AUTHENTIFICATION
========================= */

// Connexion électeur
export const loginElecteur = (data) => {
  return API.post("/auth/login", data);
};

// Déconnexion
export const logoutUser = () => {
  return API.get("/users/logout");
};

// Utilisateur connecté
export const getCurrentUser = () => {
  return API.get("/users/me");
};

/* =========================
   ELECTEURS
========================= */

// Enrôler électeurs
export const enrollElecteurs = (electeurs) => {
  return API.post("/election/enroll", electeurs);
};

// Tous les électeurs
export const getAllElecteurs = () => {
  return API.get("/users");
};

// Supprimer électeur
export const deleteElecteur = (id) => {
  return API.delete(`/users/${id}`);
};

// Modifier électeur
export const updateElecteur = (id, data) => {
  return API.put(`/users/${id}`, data);
};

/* =========================
   VOTE
========================= */

// Enregistrer vote
export const submitVote = (data) => {
  return API.post("/users/vote", data);
};

/* =========================
   ELECTIONS
========================= */

export const createElection = (data) => {
  return API.post("/election/create", data);
};

export const getAllElections = () => {
  return API.get("/election");
};

export const openElection = (id) => {
  return API.put(`/election/open/${id}`);
};

export const closeElection = (id) => {
  return API.put(`/election/close/${id}`);
};

export const deleteElection = (id) => {
  return API.delete(`/election/${id}`);
};

/* =========================
   CANDIDATS
========================= */

export const createCandidat = (data) => {
  return API.post("/candidats/create", data);
};

export const getAllCandidats = () => {
  return API.get("/candidats");
};

export const deleteCandidat = (id) => {
  return API.delete(`/candidats/${id}`);
};

/* =========================
   TERMINAUX
========================= */

export const createTerminal = (data) => {
  return API.post("/terminaux/create", data);
};

export const getAllTerminaux = () => {
  return API.get("/terminaux");
};

export const activateTerminal = (id) => {
  return API.put(`/terminaux/activate/${id}`);
};

export const deactivateTerminal = (id) => {
  return API.put(`/terminaux/deactivate/${id}`);
};

export const deleteTerminal = (id) => {
  return API.delete(`/terminaux/${id}`);
};

/* RESULTATS*/

export const getResults = () => {
  return API.get("/results");
};

export default API;