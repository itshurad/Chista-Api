const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/menu");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, controller.create)
  .get(controller.getAll);

router
  .route("/all")
  .get(authMiddleware, isAdminMiddleware, controller.getAllInPanel);

router
  .route("/:id")
  .get(authMiddleware, isAdminMiddleware, controller.getOne)
  .delete(authMiddleware, isAdminMiddleware, controller.delete)
  .put(authMiddleware, isAdminMiddleware, controller.update);

module.exports = router;
