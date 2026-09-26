const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/ticket");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .post(authMiddleware, controller.create);

router.route("/user").get(authMiddleware, controller.userTickets);

router.route("/departments/:id/subs").get(controller.departmentsSubs);

router
  .route("/departments")
  .get(controller.departments)
  .post(authMiddleware, isAdminMiddleware, controller.createDepartments);

router
  .route("/departments-subs")
  .post(authMiddleware, isAdminMiddleware, controller.createDepartmentsSubs);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, controller.setAnswer);

router.route("/:id/answer").get(authMiddleware, controller.getAnswer);

module.exports = router;
