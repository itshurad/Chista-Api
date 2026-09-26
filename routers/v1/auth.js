const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const controller = require("../../controllers/v1/auth");
const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/me").get(authMiddleware, controller.getMe);

module.exports = router;
