const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/comment");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, controller.create)
  .get(controller.getAll);

router
  .route("/:id")
  .get(controller.getOne)
  .delete(authMiddleware, controller.delete);

router
  .route("/:id/accept")
  .put(authMiddleware, isAdminMiddleware, controller.accept);

router
  .route("/:id/reject")
  .put(authMiddleware, isAdminMiddleware, controller.reject);

router
  .route("/:id/answer")
  .post(authMiddleware, isAdminMiddleware, controller.answer);

module.exports = router;
