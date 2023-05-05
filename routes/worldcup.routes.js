const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("thisisgood");
});

module.exports = router;
