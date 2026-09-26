const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/newsletter");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .post(controller.create);

module.exports = router;

// Be Test
