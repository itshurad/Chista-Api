const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/notification");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, controller.create)
  .get(authMiddleware, isAdminMiddleware, controller.getAll);
router.route("/admins").get(authMiddleware, isAdminMiddleware, controller.get);
router.route("/:id").delete(authMiddleware, isAdminMiddleware, controller.get);
router.route("/:id/see").put(authMiddleware, isAdminMiddleware, controller.see);

module.exports = router;
// Do Test
