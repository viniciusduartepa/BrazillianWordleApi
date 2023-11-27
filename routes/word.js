const express = require("express");
const router = express.Router();
const WordController = require("../controllers/WordController");

router.get("/valid/:word", WordController.validate);
router.put("/update-daily-word", WordController.resetDailyWord);

module.exports = router;