const express = require("express");
const router = express.Router();
const WordController = require("../controllers/WordController");

router.get("/valid/:word", WordController.validate);

module.exports = router;