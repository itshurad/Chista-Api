const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/contact");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, controller.create)
  .get(authMiddleware, controller.getAll);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.delete);
router
  .route("/:id/answer")
  .post(authMiddleware, isAdminMiddleware, controller.answer);

module.exports = router;
