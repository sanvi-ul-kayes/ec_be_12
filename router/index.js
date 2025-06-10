const express = require("express");
const router = express.Router();
const api = require("./api");

//localhost:9090/
const baseUrl = process.env.BASE_URL;

//localhost:9090/api/v1
router.use(baseUrl, api);

router.use(baseUrl, (req, res) => {
  res.send("No Api found in this route");
});

module.exports = router;
