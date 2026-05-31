const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");


dotenv.config({ path: "backend/config/config.env" });

// ================= DATABASE =================
connectDB();

// ================= UNCUGHT EXCEPTIONS =================
process.on("uncaughtException", (err) => {
   console.log(`❌ ERREUR: ${err.message}`);
   console.log("Serveur arrêté (uncaught exception)");
   process.exit(1);
});

// ================= SERVER START =================
const server = app.listen(process.env.PORT, () => {
   console.log(`🚀 Serveur lancé sur le port ${process.env.PORT}`);
});

// ================= UNHANDLED PROMISE REJECTIONS =================
process.on("unhandledRejection", (err) => {
   console.log(`❌ ERREUR: ${err.message}`);
   console.log("Arrêt du serveur (unhandled rejection)");

   server.close(() => {
      process.exit(1);
   });
});