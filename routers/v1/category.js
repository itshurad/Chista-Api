const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/category");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, controller.create)
  .get(authMiddleware, isAdminMiddleware, controller.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.delete)
  .put(authMiddleware, isAdminMiddleware, controller.update);
  
module.exports = router;
