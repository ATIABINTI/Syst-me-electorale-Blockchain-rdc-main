class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message);

      // Code HTTP (401, 403, 404, 500...)
      this.statusCode = statusCode;

      // Statut lisible pour le frontend
      this.status =
         `${statusCode}`.startsWith("4") ? "fail" : "error";

      // Capture stack trace (debug propre)
      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = ErrorHandler;