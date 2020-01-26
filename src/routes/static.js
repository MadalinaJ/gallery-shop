const express = require("express");
const router = express.Router();

const staticController = require("../controllers/staticController");
const shopController = require("../controllers/shopController");

router.get("/", staticController.indexz);
router.get("/shop", shopController.getIndex);

  module.exports = router;
