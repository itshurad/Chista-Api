const express = require("express");
const controller = require("../../controllers/v1/orders");
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();

router.route("/").get(authMiddleware, controller.getAll);
router.route("/:id").get(authMiddleware, controller.getOne);

module.exports = router;
