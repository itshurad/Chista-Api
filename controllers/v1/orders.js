const courseUserModel = require("../../models/courseUser");
const { checkCourseUserId } = require("../../validators/courseUser");

exports.getAll = async (req, res) => {
  const courses = await courseUserModel
    .get({ user: req.user._id })
    .populate("course", "name href");

  return res.json({
    message: "User courses retrieved successfully.",
    courses,
  });
};

exports.getOne = async (req, res) => {
  const validationResult = checkCourseUserId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid course registration ID.",
      errors: validationResult,
    });
  }

  const courses = await courseUserModel
    .get({ _id: req.params.id })
    .populate("course")
    .populate("user", "-password");

  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: "Course registration not found.",
    });
  }

  return res.json({
    message: "Course registration details retrieved successfully.",
    courses,
  });
};
