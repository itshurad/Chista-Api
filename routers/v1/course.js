const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/course");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover",
    ),
    controller.create,
  )
  .get(authMiddleware, isAdminMiddleware, controller.getAll);

router.route("/popular").get(controller.popular);

router.route("/presell").get(controller.presell);

router.route("/:href").get(authMiddleware, controller.getOne);

router
  .route("/sessions/:id")
  .get(authMiddleware, isAdminMiddleware, controller.getOneSession)
  .delete(authMiddleware, isAdminMiddleware, controller.deleteSession);
router
  .route("/sessions")
  .get(authMiddleware, isAdminMiddleware, controller.getAllSession);

router.route("/category/:href").get(controller.getCoursesByCategoryHref);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.delete)
  .put(authMiddleware, isAdminMiddleware, controller.create);

router.route("/related/:href").get(controller.relatedCourses);

router.route("/:id/sessions").post(
  // multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
  //   "video",
  // ),
  authMiddleware,
  isAdminMiddleware,
  controller.createSession,
);

router.route("/:href/:sessionID").get(controller.getSessionInfo);
router
  .route("/:id/register")
  .post(authMiddleware, controller.register)
  .get(authMiddleware, isAdminMiddleware, controller.register);

module.exports = router;
