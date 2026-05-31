const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

// ================= SECURITY + DEBUG =================
app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);

// logs des requêtes (utile debug élections)
app.use(morgan("dev"));

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");

app.use("/api/users", userRoutes);
app.use("/api/election", electionRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
   res.send("🚀 Backend Election Blockchain OK");
});

// ================= PRODUCTION BUILD REACT =================
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/build")));

   app.get("*", (req, res) => {
      res.sendFile(
         path.resolve(__dirname, "../frontend/build/index.html")
      );
   });
}

module.exports = app;