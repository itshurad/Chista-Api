const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/user");
const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, controller.getAll);
router
  .route("/ban/:id")
  .get(authMiddleware, isAdminMiddleware, controller.banUser);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.removeUser)
  .put(authMiddleware, controller.updateUser);
router
  .route("/role")
  .put(authMiddleware, isAdminMiddleware, controller.changeRole);

module.exports = router;
