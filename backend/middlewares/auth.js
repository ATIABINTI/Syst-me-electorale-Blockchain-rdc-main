const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//  Vérifier si utilisateur connecté
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

   const { token } = req.cookies;

   if (!token) {
      return next(new ErrorHandler("Veuillez vous connecter", 401));
   }

   let decoded;

   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (error) {
      return next(new ErrorHandler("Token invalide ou expiré", 401));
   }

   const user = await User.findById(decoded.id);

   if (!user) {
      return next(new ErrorHandler("Utilisateur introuvable", 404));
   }

   req.user = user;
   next();
});


//  Vérifier rôle (admin)
exports.authorizeRoles = (...roles) => {
   return (req, res, next) => {

      if (!req.user) {
         return next(new ErrorHandler("Utilisateur non authentifié", 401));
      }

      if (!roles.includes(req.user.role)) {
         return next(
            new ErrorHandler(
               `Accès refusé : rôle (${req.user.role}) non autorisé`,
               403
            )
         );
      }

      next();
   };
};