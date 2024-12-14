const express = require("express");
const router = express.Router();

router.post("/calculate", (req, res) => {
  const { investment, rate, years } = req.body;
  const futureValue = investment * Math.pow(1 + rate / 100, years);
  res.json({ futureValue });
});

module.exports = router;