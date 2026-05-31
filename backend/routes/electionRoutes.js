const express = require("express");
const router = express.Router();

const {
  enrollElectors
} = require("../controllers/enrollElectorsBulk");

router.post("/enroll", enrollElectors);

module.exports = router;