const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./models/User");
const sendEmail = require("./utils/sendEmail");
const { emails } = require("./data/data");

// Config env
dotenv.config({ path: "backend/config/config.env" });

// Connexion DB
connectDB();

// ================= RESET USERS =================
const seedUsers = async () => {
   try {
      await User.deleteMany();
      console.log(" Tous les utilisateurs supprimés");

      const createdUsers = await User.insertMany(emails);
      console.log(`👥 ${createdUsers.length} utilisateurs enregistrés`);

      for (const user of createdUsers) {
         await sendEmail({
            email: user.email,
            subject: "Inscription Électorale",
            message: `Votre compte a été créé avec succès. ID carte: ${user.idCard}`,
         });
      }

      console.log("📧 Emails envoyés à tous les électeurs");

      process.exit();

   } catch (error) {
      console.error("❌ Erreur seed:", error.message);
      process.exit(1);
   }
};

seedUsers();