const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/article");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");

const router = express.Router();

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("cover");

router
  .route("/")
  .get(controller.getAll)
  .post(authMiddleware, isAdminMiddleware, upload, controller.create);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.delete)
  .put(authMiddleware, isAdminMiddleware, upload, controller.update);

router.route("/href/:href").get(controller.getOne);

router
  .route("/draft")
  .get(authMiddleware, isAdminMiddleware, upload, controller.draft);

module.exports = router;
