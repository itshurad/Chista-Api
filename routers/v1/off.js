const experss = require("express");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/off");

const router = experss.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .post(authMiddleware, isAdminMiddleware, controller.create);
router
  .route("/all")
  .post(authMiddleware, isAdminMiddleware, controller.setOnAll);
router.route("/:code").get(controller.getOne);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.delete);
module.exports = router;
